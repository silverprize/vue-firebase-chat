import { Module } from 'vuex'
import { CONNECT, DISCONNECT } from './actions.type'
import { CLEAR, SET_ID } from './mutations.type'
import { GET_ID, IS_CONNECTING } from './getters.type'
import { connect, disconnect } from '@/services/chat'

interface State {
  chatId: string
}

const module: Module<State, any> = {
  state: {
    chatId: '',
  },
  getters: {
    [IS_CONNECTING]: state => !!state.chatId,
    [GET_ID]: state => state.chatId,
  },
  mutations: {
    [SET_ID]: (state, id) => {
      state.chatId = id
    },
    [CLEAR]: (state) => {
      state.chatId = ''
    },
  },
  actions: {
    [CONNECT]: async ({ commit }, id) => {
      await connect(id)
      commit(SET_ID, id)
    },
    [DISCONNECT]: async ({ commit }) => {
      await disconnect()
      commit(CLEAR)
    },
  },
}
export default module
