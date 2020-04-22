import { Module } from 'vuex'
import { CLEAR, SET_ID } from './mutations.type'
import { GET_ID, IS_CONNECTING } from './getters.type'
import { CHECK_SESSION, CONNECT, DISCONNECT } from '@/store/session/actions.type'
import { RootState } from '@/store/root'

interface State {
  chatId: string;
}

const module: Module<State, RootState> = {
  state: () => ({
    chatId: '',
  }),
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
      // TODO store migration
      commit(SET_ID, id)
    },
    [DISCONNECT]: async ({ rootState, commit }) => {
      // TODO store migration
      commit(CLEAR)
    },
  },
}
export default module
