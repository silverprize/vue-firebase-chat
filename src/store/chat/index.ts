import { Module } from 'vuex'
import {
  ADD_MESSAGE,
  CLEAR,
  SET_IMAGE_URL,
  SET_PEOPLE_IN_ROOM,
  SET_ROOM,
  SET_ROOM_LIST,
} from './mutations.type'
import {
  GET_COUNT_PEOPLE,
  GET_MESSAGE_LIST,
  GET_ROOM_LIST,
  GET_ROOM_NAME,
} from '@/store/chat/getters.type'
import { Message, MessageContentType, Room } from '@/types'
import {
  DISPATCH_MESSAGE,
  FETCH_ROOM_INFO,
  FETCH_ROOM_LIST,
  JOIN_ROOM,
  LEAVE_ROOM,
} from '@/store/chat/actions.type'
import { dispatchMessage, fetchRoomInfo, fetchRoomList, join, leave } from '@/services/chat'
import { FileInfo } from 'socket.io-file-client'

interface State {
  roomList: []
  people: []
  messageList: Message[]
  room: Room
  imageMessageMap: { [key: string]: Message }
}

const blankRoom = { name: '', countPeople: 0 }
const chat: Module<State, any> = {
  state: {
    roomList: [],
    people: [],
    messageList: [],
    room: blankRoom,
    imageMessageMap: {},
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
    [ADD_MESSAGE]: (state, message: Message) => {
      if (message.contentType === MessageContentType.Image) {
        state.imageMessageMap[message.uploadId as string] = message
      }
      state.messageList.push(message)
    },
    [SET_IMAGE_URL]: (state, data: FileInfo & { url: string }) => {
      if (state.imageMessageMap[data.uploadId]) {
        state.imageMessageMap[data.uploadId].content = data.url
      }
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
    [FETCH_ROOM_INFO]: async ({ commit }, room) => {
      const roomInfo = await fetchRoomInfo(room)
      commit(SET_ROOM, roomInfo)
    },
    [DISPATCH_MESSAGE]: async ({ commit }, message) => {
      await dispatchMessage(message)
    },
    [JOIN_ROOM]: async ({ dispatch }, room) => {
      await join(room)
      await dispatch(FETCH_ROOM_INFO, room)
    },
    [LEAVE_ROOM]: async ({ commit }) => {
      await leave()
      commit(CLEAR)
    },
  },
}

export default chat
