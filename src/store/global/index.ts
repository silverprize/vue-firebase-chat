import { Module } from 'vuex'
import { SET_BUSY, SET_MESSAGE } from './mutations.type'
import { HAS_MESSAGE, IS_BUSY } from './getters.type'

interface State {
  isRunning: boolean
  message: string
}

const global: Module<State, any> = {
  state: {
    isRunning: false,
    message: '',
  },
  getters: {
    [IS_BUSY]: state => state.isRunning,
    [HAS_MESSAGE]: state => !!state.message,
  },
  mutations: {
    [SET_BUSY]: (state, enable) => {
      state.isRunning = enable
    },
    [SET_MESSAGE]: (state, message) => {
      state.message = message
    },
  },
}

export default global
