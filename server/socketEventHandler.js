const path = require('path')
const SocketIO = require('socket.io')
const SocketIOFile = require('socket.io-file')
const uuid = require('uuid')
const protocol = require('./protocol')

const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL

const Lobby = 'Lobby'
const Moon = 'Moon'
const Mercury = 'Mercury'
const Mars = 'Mars'
const Earth = 'Earth'
const Pluto = 'Pluto'
const Uranus = 'Uranus'

const chatRoomNames = [
  Moon,
  Mercury,
  Mars,
  Earth,
  Pluto,
  Uranus,
]

const status = {
  people: {},
  chatRooms: {},
  countTotalPeople: 0,
}
status.chatRooms = chatRoomNames.concat(Lobby).reduce((map, name) => {
  map[name] = {
    name,
    countPeople: 0,
  }
  return map
}, {})

function connected(socket) {
  console.info('connected:', socket.id)
  socket.on(protocol.BUILTIN_DISCONNECT, async () => {
    // registerId 실패한 클라이언트는 chatId가 없음.
    if (socket.chatId) {
      // 나가기가 아닌 다른 경로로 접속을 끊었을때 퇴장 메시지 전파하기.
      if (socket.currentChatRoom !== Lobby) {
        getChatRoomBroadcaster(socket, socket.currentChatRoom).emit(protocol.RES_LEFT,
          createNewMessage({
            room: socket.currentChatRoom,
            chatId: socket.chatId,
          }),
        )
      }
      await leaveSocketRoom(socket, socket.currentChatRoom)
      delete status.people[socket.chatId]
      status.countTotalPeople--
    }
    console.info('disconnected:', socket.id, socket.chatId, socket.currentChatRoom)
    printStatus()
  })
}

async function registerId(socket, id) {
  const exists = !!status.people[id]
  if (!exists) {
    socket.chatId = id
    status.people[id] = socket
    status.countTotalPeople++
    await joinChatRoom(socket, Lobby)
    console.info('registered:', socket.id, socket.chatId, socket.currentChatRoom)
    printStatus()
  }
  socket.emit(protocol.REQ_REGISTER_ID, exists ? '접속중인 아이디입니다.' : null)
}

function sendRoomList(socket) {
  socket.emit(protocol.REQ_ROOM_LIST, chatRoomNames.map(name => ({
    name,
    countPeople: status.chatRooms[name].countPeople,
  })))
}

function sendRoomInfo(socket, chatRoom) {
  socket.emit(protocol.REQ_ROOM_INFO, status.chatRooms[chatRoom])
}

async function joinChatRoom(socket, chatRoom) {
  const { currentChatRoom } = socket
  if (currentChatRoom && currentChatRoom !== chatRoom) {
    await leaveSocketRoom(socket, currentChatRoom)
  }
  await joinSocketRoom(socket, chatRoom)
  socket.currentChatRoom = chatRoom
  getChatRoomBroadcaster(socket, chatRoom).emit(protocol.RES_JOINED, createNewMessage({
    room: chatRoom,
    chatId: socket.chatId,
  }))
  socket.to(Lobby).emit(protocol.RES_JOINED, {
    room: chatRoom,
    chatId: socket.chatId,
  })
  socket.emit(protocol.REQ_JOIN)
}

async function leaveChatRoom(socket) {
  const { currentChatRoom } = socket
  if (!currentChatRoom) return
  await leaveSocketRoom(socket, currentChatRoom)
  socket.currentChatRoom = null
  getChatRoomBroadcaster(socket, currentChatRoom).emit(protocol.RES_LEFT, createNewMessage({
    room: currentChatRoom,
    chatId: socket.chatId,
  }))
  if (currentChatRoom !== Lobby) {
    await joinChatRoom(socket, Lobby)
  }
  socket.emit(protocol.REQ_LEAVE)
}

function sendMessageToChatRoom(socket, message) {
  socket.emit(protocol.REQ_MESSAGE)
  getChatRoomBroadcaster(socket, socket.currentChatRoom).emit(protocol.RES_NEW_MESSAGE, createNewMessage(message))
}

function sendInvitation(socket, { chatId, room: chatRoom }) {
  const receiver = status.people[chatId]
  if (receiver) {
    receiver.emit(protocol.RES_INVITED, { chatId: socket.chatId, room: chatRoom })
  }
  socket.emit(protocol.REQ_INVITE)
}

function sendPeopleInOtherRooms(socket) {
  const people = Object.keys(status.people).reduce((list, otherChatId) => {
    const other = status.people[otherChatId]
    const isMe = otherChatId === socket.chatId
    const sameChatRoom = other.currentChatRoom === socket.currentChatRoom
    if (!isMe && !sameChatRoom) {
      list.push(otherChatId)
    }
    return list
  }, [])
  socket.emit(protocol.REQ_PEOPLE_OTHER_ROOMS, people)
}

function getChatRoomBroadcaster(socket, chatRoom) {
  return socket.nsp.to(chatRoom)
}

function joinSocketRoom(socket, chatRoom) {
  return new Promise((resolve) => {
    socket.join(chatRoom, () => {
      status.chatRooms[chatRoom].countPeople++
      resolve()
    })
  })
}

function leaveSocketRoom(socket, chatRoom) {
  return new Promise((resolve) => {
    socket.leave(chatRoom, () => {
      status.chatRooms[chatRoom].countPeople--
      resolve()
    })
  })
}

function createNewMessage(message) {
  const time = new Date()
  return {
    ...message,
    id: uuid.v1(),
    sentAt: time.toISOString(),
    timestamp: time.getTime(),
  }
}

function printStatus() {
  console.info('status:', status.countTotalPeople, status.chatRooms)
}

function attachFileHandler(socket) {
  const chunkSize = 10240
  const uploader = new SocketIOFile(socket, {
    uploadDir: path.join(__dirname, imageBaseUrl),
    chunkSize,
    rename: (fileName) => {
      const extName = path.extname(fileName)
      return `${uuid.v1()}${extName}`
    },
  })
  uploader.on('stream', (fileInfo) => {
    if (fileInfo.wrote <= chunkSize) {
      sendMessageToChatRoom(socket, {
        ...fileInfo.data,
        uploadId: fileInfo.uploadId,
      })
    }
  })
  uploader.on('complete', (fileInfo) => {
    getChatRoomBroadcaster(socket, socket.currentChatRoom).emit(protocol.RES_IMAGE_UPLOADED, createNewMessage({
      ...fileInfo,
      url: `${imageBaseUrl}/${fileInfo.name}`,
    }))
  })
  uploader.on('error', (err) => {
    socket.emit(protocol.RES_IMAGE_UPLOADED, err)
  })
  uploader.on('abort', (err) => {
    socket.emit(protocol.RES_IMAGE_UPLOADED, err)
  })
}

module.exports = (server) => {
  const chat = new SocketIO(server, {
    pingTimeout: 60000,
  })
  chat.on('connection', (socket) => {
    connected(socket)

    attachFileHandler(socket)

    socket.on(protocol.REQ_REGISTER_ID, registerId.bind(null, socket))

    socket.on(protocol.REQ_ROOM_LIST, sendRoomList.bind(null, socket))

    socket.on(protocol.REQ_ROOM_INFO, sendRoomInfo.bind(null, socket))

    socket.on(protocol.REQ_JOIN, (chatRoom) => joinChatRoom(socket, chatRoom))

    socket.on(protocol.REQ_LEAVE, () => leaveChatRoom(socket))

    socket.on(protocol.REQ_MESSAGE, sendMessageToChatRoom.bind(null, socket))

    socket.on(protocol.REQ_INVITE, sendInvitation.bind(null, socket))

    socket.on(protocol.REQ_PEOPLE_OTHER_ROOMS, sendPeopleInOtherRooms.bind(null, socket))
  })
}
