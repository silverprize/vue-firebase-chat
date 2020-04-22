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
import {
  DISPATCH_MESSAGE,
  FETCH_ALL_PEOPLE,
  JOIN_ROOM,
  LEAVE_ROOM,
  SEND_INVITATION,
  UPDATE_ROOM_INFO,
  UPDATE_ROOM_LIST,
} from '@/store/chat/actions.type'
import { RootState } from '@/store/root'
import { FileInfo, Message, MessageContentType, Room } from '@/store/chat/types'

interface State {
  roomList: [];
  people: [];
  messageList: Message[];
  room: Room;
  imageMessageMap: { [key: string]: Message };
}

const dummyRoom = { order: -1, name: '', countPeople: 0 }
const chat: Module<State, RootState> = {
  state: () => ({
    roomList: [],
    people: [],
    messageList: [],
    room: dummyRoom,
    imageMessageMap: {},
  }),
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

      let insertIndex = 0
      for (let i = state.messageList.length - 1; i >= 0; i--) {
        if (state.messageList[i].sequence < message.sequence) {
          insertIndex = i + 1
          break
        }
      }
      state.messageList.splice(insertIndex, 0, message)
    },
    [SET_IMAGE_URL]: (state, data: FileInfo & { url: string }) => {
      if (state.imageMessageMap[data.uploadId]) {
        state.imageMessageMap[data.uploadId].content = data.url
        delete state.imageMessageMap[data.uploadId]
        state.imageMessageMap = { ...state.imageMessageMap }
      }
    },
    [CLEAR]: (state) => {
      state.messageList = []
      state.roomList = []
      state.people = []
      state.room = dummyRoom
    },
  },
  actions: {
    [UPDATE_ROOM_LIST]: async ({ rootState, commit }) => {
      // TODO store migration
    },
    [UPDATE_ROOM_INFO]: async ({ rootState, commit }, room) => {
      // TODO store migration
    },
    [FETCH_ALL_PEOPLE]: ({ rootState }) => {
    },
    [DISPATCH_MESSAGE]: async ({ rootState }, message) => {
    },
    [JOIN_ROOM]: async ({ rootState, commit, dispatch }, room) => {
      commit(CLEAR)
      await dispatch(UPDATE_ROOM_INFO, room)
    },
    [LEAVE_ROOM]: async ({ rootState }) => {
    },
    [SEND_INVITATION]: async ({ rootState }, { chatId, room }) => {
    },
  },
}

export default chat
