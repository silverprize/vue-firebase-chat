import { Module } from 'vuex'
import { SET_BUSY } from './mutations.type'
import { IS_BUSY } from './getters.type'
import { RootState } from '@/store'

interface State {
  isRunning: boolean
}

const global: Module<State, RootState> = {
  state: {
    isRunning: false,
  },
  getters: {
    [IS_BUSY]: state => state.isRunning,
  },
  mutations: {
    [SET_BUSY]: (state, enable) => {
      state.isRunning = enable
    },
  },
}

export default global
