import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import global from './global'
import session from './session'
import chat from './chat'
import { GET_SOCKET } from '@/store/getters.type'
import {
  NEW_SOCKET,
  REMOVE_SOCKET_EVENT_LISTENER,
  SET_SOCKET_EVENT_LISTENER,
} from '@/store/mutations.type'
import Socket from '@/services/socket'

Vue.use(Vuex)

export type RootState = {
  socket: Socket
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    global,
    session,
    chat,
  },
  state: {
    socket: new Socket(),
  },
  getters: {
    [GET_SOCKET]: state => state.socket,
  },
  mutations: {
    [NEW_SOCKET]: (state) => {
      state.socket = new Socket()
    },
    [SET_SOCKET_EVENT_LISTENER]: (state, { event, callback }) => {
      state.socket.setSocketEventListener(event, callback)
    },
    [REMOVE_SOCKET_EVENT_LISTENER]: (state, callback) => {
      state.socket.removeSocketEventListener(callback)
    },
  },
}

export default new Vuex.Store(storeOptions)
