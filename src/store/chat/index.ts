import { Module } from 'vuex'
import { ADD_MESSAGE, CLEAR, SET_PEOPLE_IN_ROOM, SET_ROOM, SET_ROOM_LIST } from './mutations.type'
import {
  GET_COUNT_PEOPLE,
  GET_MESSAGE_LIST,
  GET_ROOM_LIST,
  GET_ROOM_NAME,
} from '@/store/chat/getters.type'
import { Message, MessageContentType, MessageParams, MessageType, Room } from '@/types'
import {
  DISPATCH_MESSAGE,
  FETCH_ROOM_INFO,
  FETCH_ROOM_LIST,
  JOIN_ROOM,
  LEAVE_ROOM,
} from '@/store/chat/actions.type'
import {
  dispatchMessage,
  fetchRoomInfo,
  fetchRoomList,
  join,
  leave,
  listenRoomEvent, stopListenRoomEvent,
} from '@/services/chat'
import { RES_JOINED, RES_LEFT, RES_NEW_MESSAGE } from '@/../server/protocol.js'

interface State {
  roomList: []
  people: []
  messageList: Message[]
  room: Room
}

const blankRoom = { name: '', countPeople: 0 }
const chat: Module<State, any> = {
  state: {
    roomList: [],
    people: [],
    messageList: [],
    room: blankRoom,
  },
  getters: {
    [GET_ROOM_LIST]: state => state.roomList,
    [GET_ROOM_NAME]: state => state.room.name,
    [GET_COUNT_PEOPLE]: state => state.room.countPeople,
    [GET_MESSAGE_LIST]: state => state.messageList,
  },
  mutations: {
    [SET_ROOM_LIST]: (state, roomList) => {
      state.roomList = roomList
    },
    [SET_PEOPLE_IN_ROOM]: (state, people) => {
      state.people = people
    },
    [SET_ROOM]: (state, room: Room) => {
      state.room = room
    },
    [ADD_MESSAGE]: (state, message: MessageParams) => {
      const msg = Object.assign({
        sentAt: new Date().toISOString(),
      }, message) as Message
      if (message.contentType === MessageContentType.Image) {
        msg.content = '/kakao.jpg'
      }
      state.messageList.push(msg)
    },
    [CLEAR]: (state) => {
      state.messageList = []
      state.roomList = []
      state.people = []
      state.room = blankRoom
    },
  },
  actions: {
    [FETCH_ROOM_LIST]: async ({ commit }) => {
      const roomList = await fetchRoomList()
      commit(SET_ROOM_LIST, roomList)
    },
    [FETCH_ROOM_INFO]: async ({ commit }, roomName) => {
      const roomInfo = await fetchRoomInfo(roomName)
      commit(SET_ROOM, roomInfo)
    },
    [DISPATCH_MESSAGE]: async ({ commit }, message) => {
      await dispatchMessage(message)
    },
    [JOIN_ROOM]: async ({ commit, dispatch }, roomName) => {
      listenRoomEvent(async (event: string, data: any) => {
        switch (event) {
          case RES_NEW_MESSAGE:
            commit(ADD_MESSAGE, data)
            break
          case RES_JOINED:
            commit(ADD_MESSAGE, {
              type: MessageType.System,
              content: `${data.chatId}님이 입장했습니다.`,
            })
            await dispatch(FETCH_ROOM_INFO, roomName)
            break
          case RES_LEFT:
            commit(ADD_MESSAGE, {
              type: MessageType.System,
              content: `${data.chatId}님이 떠났습니다.`,
            })
            await dispatch(FETCH_ROOM_INFO, roomName)
            break
        }
      })
      await join(roomName)
      await dispatch(FETCH_ROOM_INFO, roomName)
    },
    [LEAVE_ROOM]: async ({ commit }) => {
      stopListenRoomEvent()
      await leave()
      commit(CLEAR)
    },
  },
}

export default chat
