import { Module } from 'vuex'
import { CONNECT, DISCONNECT } from './actions.type'
import { CLEAR, SET_ID } from './mutations.type'
import { GET_ID, IS_CONNECTING } from './getters.type'
import { connect, disconnect } from '@/services/chat'

interface State {
  id: string
}

const module: Module<State, any> = {
  state: {
    id: '1',
  },
  getters: {
    [IS_CONNECTING]: state => !!state.id,
    [GET_ID]: state => state.id,
  },
  mutations: {
    [SET_ID]: (state, id) => {
      state.id = id
    },
    [CLEAR]: (state) => {
      state.id = ''
    },
  },
  actions: {
    [CONNECT]: async ({ commit }, id) => {
      await connect()
      commit(SET_ID, id)
    },
    [DISCONNECT]: async ({ commit }) => {
      await disconnect()
      commit(CLEAR)
    },
  },
}
export default module
