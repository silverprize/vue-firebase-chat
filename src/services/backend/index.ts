import firebase, { UserInfo } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/analytics'
import { ChatUser, Message, Room, Session } from '@/services/backend/types'
import firebaseConfig from '@/../firebase.config.json'
import DataSnapshot = firebase.database.DataSnapshot
import ContentType = Message.ContentType

const ServerValue = firebase.database.ServerValue
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDatabase = firebaseApp.database()
const firebaseStorage = firebaseApp.storage()

enum ChatEvent {
  ROOM_UPDATED = 'ROOM_UPDATED',
  USER_LIST_LOADED = 'USER_LIST_LOADED',
  USER_JOINED = 'USER_JOINED',
  USER_LEAVE = 'USER_LEAVE',
  NEW_MESSAGE = 'NEW_MESSAGE',
  IMAGE_UPLOADED = 'IMAGE_UPLOADED',
  DISCONNECTED = 'DISCONNECTED',
  INVITATION_RECEIVED = 'INVITATION_RECEIVED',
}

function checkUserSession(): Promise<Session | null> {
  return new Promise((resolve, reject) => {
    const off = firebaseAuth.onAuthStateChanged(async () => {
      off()
      try {
        const sessionSnapshot = await getSessionRef().once('value')
        resolve(sessionSnapshot.val())
      } catch (e) {
        reject(e)
      }
    })
  })
}

async function signIn(name: string) {
  await firebaseAuth.signInAnonymously()
  const user = getCurrentUser()
  const refs = await getSessionsRef().orderByChild('name').equalTo(name).once('value')
  let exist = refs.exists()
  refs.forEach((ref) => {
    if (ref.val().online) {
      exist = true
      return true
    }
  })
  if (exist) {
    firebaseAuth.signOut()
    throw new Error('사용중인 이름입니다.')
  }
  await Promise.all([
    getSessionRef().update({
      name,
    }),
    user.updateProfile({ displayName: name }),
  ])
  return user
}

function signOut() {
  getSessionRef().remove()
  return firebaseAuth.signOut()
}

function dispatchMessage(roomId: string, params: Message.Params) {
  const user = getCurrentUser()
  const message = {
    ...params,
    sender: {
      id: user.uid,
      name: user.displayName,
    },
    createdAt: ServerValue.TIMESTAMP,
  }
  if (params.contentType === Message.ContentType.Image) {
    const files = params.content as File[]
    message.content = null
    return files.map(async (file) =>
      getChatRoomRef(roomId)
        .child('messages')
        .push(message)
        .then(ref => {
          const path = [
            roomId,
            ref.key,
            new Date().toISOString(),
            user.uid,
            file.name,
          ].join('/')
          uploadFile(path, file).then((url) => ref.update({ content: url }))
        }))
  } else {
    return getChatRoomRef(roomId)
      .child('messages')
      .push(message)
  }
}

function uploadFile(destPath: string, file: File) {
  return firebaseStorage
    .ref(destPath)
    .put(file)
    .then((snapshot) => snapshot.ref.getDownloadURL())
}

async function fetchUsers() {
  const snapshots = await getSessionsRef()
    .orderByChild('online')
    .equalTo(true)
    .once('value')
  const users: { id: string; name: string, currentRoomId: string; }[] = []
  snapshots.forEach((snapshot) => {
    const data = snapshot.val()
    users.push({
      id: snapshot.key as string,
      name: data.name,
      currentRoomId: data.currentRoomId,
    })
  })
  return users
}

function sendInvitation({ room, invitee }: {
  room: { id: string; name: string };
  invitee: string;
}) {
  const { uid, displayName } = getCurrentUser()
  return getInvitations()
    .child(invitee)
    .push({
      room,
      inviter: {
        id: uid,
        name: displayName,
      },
      createdAt: ServerValue.TIMESTAMP,
    })
}

function subscribeAuthState(callbackFn: (user: UserInfo | null) => void) {
  return firebaseAuth.onAuthStateChanged((user) => {
    const userInfo = (user?.toJSON() as UserInfo) || null
    callbackFn(userInfo)
  })
}

function subscribeInvitation(callbackFn: (invitation: any) => void) {
  const { uid } = getCurrentUser()
  const invitationRef = getInvitations()
    .child(uid)
    .orderByChild('createdAt')
    .startAt(Date.now())
  invitationRef.on('child_added', snapshot => callbackFn({
    ...snapshot.val(),
    id: snapshot.key,
  }))
  return () => invitationRef.off()
}

function subscribeChatRooms(roomsCallbackFn: (rooms: Room[]) => void): Promise<() => void> {
  return new Promise(resolve => {
    const chatRoomStatesRef = getChatRoomStatesRef().orderByChild('order')
    chatRoomStatesRef.on('value', (chatRoomsSnapshots: DataSnapshot) => {
      const rooms: Room[] = []
      chatRoomsSnapshots.forEach(chatRoomSnapshot => {
        const data = chatRoomSnapshot.val()
        rooms.push({
          ...data,
          countPeople: data.countPeople || 0,
          id: chatRoomSnapshot.key,
        })
      })
      roomsCallbackFn(rooms)
      resolve(() => chatRoomStatesRef.off())
    })
  })
}

async function subscribeChatRoom(roomId: string, roomCallbackFn: (event: ChatEvent, data: Room | ChatUser | Message | ChatUser[]) => void) {
  const { uid } = getCurrentUser()
  const chatRoomUsersRef = getChatRoomUsersRef(roomId)
  const userSnapshots = await chatRoomUsersRef.once('value')
  const me: ChatUser = await addUserToChatRoom(roomId)
  const chatRoomStateRef = getChatRoomStateRef(roomId)
  const chatRoomUsersQuery = chatRoomUsersRef.orderByChild('joinedAt').startAt(me.joinedAt)
  const chatRoomMessagesQuery = getChatRoomMessagesRef(roomId).orderByChild('createdAt').startAt(me.joinedAt)
  const roomUsersDisconnection = chatRoomUsersQuery.ref.child(uid).onDisconnect()
  const roomStateDisconnection = chatRoomStateRef.onDisconnect()

  await Promise.all([
    roomUsersDisconnection.remove(),
    roomStateDisconnection.update({ countPeople: ServerValue.increment(-1) }),
  ])

  const users: ChatUser[] = []
  userSnapshots.forEach(snapshot => {
    users.push({
      ...snapshot.val(),
      id: snapshot.key,
    })
  })
  roomCallbackFn(ChatEvent.USER_LIST_LOADED, users)

  chatRoomStateRef.on('value', (snapshot) => {
    const data = snapshot.val()
    roomCallbackFn(
      ChatEvent.ROOM_UPDATED,
      {
        ...data,
        id: snapshot.key,
      },
    )
  })
  chatRoomUsersQuery.on('child_added', (snapshot) => {
    const data = snapshot.val()
    roomCallbackFn(
      ChatEvent.USER_JOINED,
      data,
    )
  })
  chatRoomUsersQuery.on('child_removed', (snapshot) => {
    const data = snapshot.val()
    roomCallbackFn(
      ChatEvent.USER_LEAVE,
      data,
    )
  })
  chatRoomMessagesQuery.on('child_added', (snapshot) => {
    const data = snapshot.val()
    const message: Message = {
      ...data,
      id: snapshot.key,
    }
    roomCallbackFn(
      ChatEvent.NEW_MESSAGE,
      message,
    )
  })
  chatRoomMessagesQuery.on('child_changed', (snapshot) => {
    const data = snapshot.val()
    if (data.contentType === ContentType.Image && data.content) {
      roomCallbackFn(
        ChatEvent.IMAGE_UPLOADED,
        {
          ...data,
          id: snapshot.key,
        },
      )
    }
  })

  return async () => {
    chatRoomStateRef.off()
    chatRoomUsersQuery.off()
    chatRoomMessagesQuery.off()
    await removeUserFromRoom(roomId)
    await Promise.all([
      roomStateDisconnection.cancel(),
      roomUsersDisconnection.cancel(),
    ])
  }
}

// https://firebase.google.com/docs/firestore/solutions/presence?hl=ko
function subscribeConnectionState(callbackFn: (connected: boolean) => void) {
  const { uid } = getCurrentUser()
  const sessionRef = firebaseDatabase.ref(`/sessions/${uid}`)
  const connectionRef = firebaseDatabase.ref('.info/connected')
  let promise = Promise.resolve()
  connectionRef.on(
    'value',
    (snapshot) => {
      promise = promise.then(() => {
        if (snapshot.val() === false) {
          callbackFn(false)
          return
        }
        return sessionRef
          .onDisconnect()
          .update({
            online: false,
            lastChanged: ServerValue.TIMESTAMP,
          })
          .then(() => {
            sessionRef.update({
              online: true,
              lastChanged: ServerValue.TIMESTAMP,
            })
            callbackFn(true)
          })
      })
    },
  )

  return () => connectionRef.off()
}

function getCurrentUser() {
  const user = firebaseAuth.currentUser
  if (user == null) {
    throw new Error('Unauthorized')
  }
  return user
}

function getChatRoomStatesRef() {
  return firebaseDatabase.ref('chatRoomStates')
}

function getChatRoomStateRef(roomId: string) {
  return getChatRoomStatesRef().child(roomId)
}

function getChatRoomsRef() {
  return firebaseDatabase.ref('chatRooms')
}

function getChatRoomRef(roomId: string) {
  return getChatRoomsRef().child(roomId)
}

function getChatRoomUsersRef(roomId: string) {
  return getChatRoomRef(roomId).child('users')
}

function getChatRoomMessagesRef(roomId: string) {
  return getChatRoomRef(roomId).child('messages')
}

function getSessionsRef() {
  return firebaseDatabase.ref('sessions')
}

function getSessionRef() {
  return getSessionsRef().child(getCurrentUser().uid)
}

function getInvitations() {
  return firebaseDatabase.ref('invitations')
}

async function addUserToChatRoom(roomId: string) {
  const { uid, displayName } = getCurrentUser()
  const chatRoomUsersRef = getChatRoomUsersRef(roomId)
  const chatRoomUserRef = chatRoomUsersRef.child(uid)
  const chatRoomStateRef = getChatRoomStateRef(roomId)
  const sessionRef = getSessionRef()
  try {
    await chatRoomUserRef.set({
      id: uid,
      name: displayName,
      joinedAt: ServerValue.TIMESTAMP,
    })
    const users = await chatRoomUsersRef.once('value')
    await chatRoomStateRef.update({ countPeople: users.numChildren() })
    await sessionRef.update({ currentRoomId: roomId })
    const me = await chatRoomUserRef.once('value')
    return me.val()
  } catch (e) {
    sessionRef.update({ currentRoomId: null })
    chatRoomUserRef.remove()
    throw e
  }
}

async function removeUserFromRoom(roomId: string) {
  const { uid } = getCurrentUser()
  const chatRoomStateRef = getChatRoomStateRef(roomId)
  const chatRoomUsersRef = getChatRoomUsersRef(roomId)
  const chatRoomUserRef = chatRoomUsersRef.child(uid)
  const sessionRef = getSessionRef()
  try {
    await chatRoomUserRef.remove()
    const users = await chatRoomUsersRef.once('value')
    await chatRoomStateRef.update({ countPeople: users.numChildren() })
    await sessionRef.update({ currentRoomId: null })
  } catch {
    sessionRef.update({ currentRoomId: null })
    chatRoomUserRef.remove()
  }
}

export * from './types'
export {
  ChatEvent,
  checkUserSession,
  signIn,
  signOut,
  dispatchMessage,
  subscribeConnectionState,
  subscribeAuthState,
  subscribeInvitation,
  subscribeChatRoom,
  subscribeChatRooms,
  uploadFile,
  fetchUsers,
  sendInvitation,
}
