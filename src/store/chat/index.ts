import { Module } from 'vuex'
import { ADD_MESSAGE, CLEAR, SET_PEOPLE_IN_ROOM, SET_ROOM, SET_ROOM_LIST } from './mutations.type'
import {
  COUNT_PEOPLE,
  GET_MESSAGE_LIST,
  GET_ROOM_LIST,
  GET_ROOM_NAME,
} from '@/store/chat/getters.type'
import { Message, MessageContentType, MessageParams, Room } from '@/types'

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
    [COUNT_PEOPLE]: state => state.people.length,
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
}

export default chat
