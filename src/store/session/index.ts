import { Module } from 'vuex'
import { CLEAR, SET_ID } from './mutations.type'
import { GET_ID, IS_CONNECTING } from './getters.type'
import { RootState } from '@/store'
import { CONNECT, DISCONNECT } from '@/store/session/actions.type'

interface State {
  chatId: string
}

const module: Module<State, RootState> = {
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
    [CONNECT]: async ({ rootState, commit }, id) => {
      await rootState.socket.connect(id)
      commit(SET_ID, id)
    },
    [DISCONNECT]: async ({ rootState, commit }) => {
      await rootState.socket.disconnect()
      commit(CLEAR)
    },
  },
}
export default module
