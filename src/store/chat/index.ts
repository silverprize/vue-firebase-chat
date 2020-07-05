import Vue from 'vue'
import { ActionContext, Module } from 'vuex'
import { v1 as uuid } from 'uuid'
import {
  ADD_MESSAGE,
  ADD_USER,
  CLEAR,
  IMAGE_UPLOADED,
  REMOVE_USER,
  SET_PEOPLE,
  SET_ROOM,
  SET_ROOMS,
} from './mutations.type'
import { GET_MESSAGES, GET_PEOPLE, GET_ROOM_INFO, GET_ROOMS } from '@/store/chat/getters.type'
import {
  DISPATCH_MESSAGE,
  ENTER_LOBBY,
  ENTER_ROOM,
  LEAVE_LOBBY,
  LEAVE_ROOM,
  SEND_INVITATION,
} from '@/store/chat/actions.type'
import { RootState } from '@/store/root'
import {
  ChatEvent,
  ChatUser,
  dispatchMessage,
  Message,
  Room,
  sendInvitation,
  subscribeChatRoom,
  subscribeChatRooms,
} from '@/services/backend'
import { Dictionary } from '@/types/common'
import ContentType = Message.ContentType

interface State {
  rooms: Room[];
  people: ChatUser[];
  messages: Message[];
  room: Room;
  unsubscribes: Dictionary<Promise<() => void>>;
  imageMessageIndices: Dictionary<number>
}

const SubRoomsKey = 'RoomsKey'
const SubRoomKey = 'RoomKey'
const dummyRoom = { id: '', order: -1, name: '', countPeople: 0 }
const chatModule: Module<State, RootState> = {
  state: () => ({
    rooms: [],
    people: [],
    messages: [],
    room: dummyRoom,
    unsubscribes: {},
    imageMessageIndices: {},
  }),
  getters: {
    [GET_ROOMS]: state => state.rooms,
    [GET_ROOM_INFO]: state => state.room,
    [GET_MESSAGES]: state => state.messages,
    [GET_PEOPLE]: state => state.people,
  },
  mutations: {
    [SET_ROOMS](state, rooms) {
      state.rooms = rooms
    },
    [SET_PEOPLE](state, people) {
      state.people = people
    },
    [SET_ROOM](state, room: Room) {
      state.room = room
    },
    [ADD_MESSAGE](state, message: Message) {
      if (message.contentType === Message.ContentType.Image) {
        state.imageMessageIndices[message.id] = state.messages.length
      }
      state.messages.push(message)
    },
    [ADD_USER](state, user: ChatUser) {
      state.people.push(user)
    },
    [REMOVE_USER](state, user: ChatUser) {
      const index = state.people.findIndex(({ id }) => id === user.id)
      state.people.splice(index, 1)
    },
    [IMAGE_UPLOADED](state, message: Message) {
      const index = state.imageMessageIndices[message.id]
      Vue.set(state.messages, index, message)
      Vue.delete(state.imageMessageIndices, message.id)
    },
    [CLEAR](state) {
      state.messages = []
      state.rooms = []
      state.people = []
      state.room = dummyRoom
    },
  },
  actions: {
    [ENTER_LOBBY](context) {
      return subscribeRoomsEvent(context)
    },
    [LEAVE_LOBBY](context) {
      return unsubscribeEvents(context, [SubRoomsKey])
    },
    [ENTER_ROOM]: (context, roomId) => {
      context.commit(CLEAR)
      return subscribeRoomEvent(context, roomId)
    },
    [LEAVE_ROOM]: (context) => {
      return unsubscribeEvents(context, [SubRoomKey])
    },
    [DISPATCH_MESSAGE](context, message: Message.Params) {
      return dispatchMessage(context.state.room.id, message)
    },
    [SEND_INVITATION]({ getters }, invitee: string) {
      const currentRoom: Room = getters[GET_ROOM_INFO]
      return sendInvitation({
        room: {
          id: currentRoom.id,
          name: currentRoom.name,
        },
        invitee,
      })
    },
  },
}

async function subscribeRoomsEvent(context: ActionContext<State, RootState>) {
  const unsubscribePromise = subscribeChatRooms((rooms) => {
    context.commit(SET_ROOMS, rooms.reduce((arr, room) => {
      arr[room.order] = room
      return arr
    }, [...context.state.rooms]))
  })
  context.state.unsubscribes[SubRoomsKey] = unsubscribePromise
  return unsubscribePromise
}

async function subscribeRoomEvent(context: ActionContext<State, RootState>, roomId: string) {
  function createSystemMessage(content: string): Message {
    return {
      id: uuid(),
      type: Message.Type.System,
      contentType: ContentType.Text,
      content,
      sender: { id: '', name: '' },
      createdAt: Date.now(),
    }
  }
  const unsubscribePromise = subscribeChatRoom(roomId, (event, data) => {
    switch (event) {
      case ChatEvent.ROOM_UPDATED:
        context.commit(SET_ROOM, data)
        break
      case ChatEvent.USER_JOINED:
        context.commit(
          ADD_MESSAGE,
          createSystemMessage(`${(data as ChatUser).name}님이 입장했습니다.`),
        )
        context.commit(ADD_USER, data)
        break
      case ChatEvent.USER_LEAVE:
        context.commit(
          ADD_MESSAGE,
          createSystemMessage(`${(data as ChatUser).name}님이 퇴장했습니다.`),
        )
        context.commit(REMOVE_USER, data)
        break
      case ChatEvent.NEW_MESSAGE:
        context.commit(ADD_MESSAGE, data)
        break
      case ChatEvent.IMAGE_UPLOADED:
        context.commit(IMAGE_UPLOADED, data)
        break
      case ChatEvent.USER_LIST_LOADED:
        context.commit(SET_PEOPLE, data)
        break
    }
  })
  context.state.unsubscribes[SubRoomKey] = unsubscribePromise
  return unsubscribePromise
}

async function unsubscribeEvents(context: ActionContext<State, RootState>, keys: string[]) {
  await Promise.all(keys.map(key => {
    const unsubscribePromise = context.state.unsubscribes[key]
    if (unsubscribePromise != null) {
      Vue.delete(context.state.unsubscribes, key)
      return unsubscribePromise.then((unsubscribe) => unsubscribe())
    }
  }))
}

export { chatModule }
