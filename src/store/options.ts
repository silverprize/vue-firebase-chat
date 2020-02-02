import { StoreOptions } from 'vuex'
import session from '@/store/session'
import chat from '@/store/chat'
import Socket from '@/services/socket'
import { GET_SOCKET, IS_BUSY } from './getters.type'
import {
  NEW_SOCKET,
  REMOVE_SOCKET_EVENT_LISTENER,
  SET_BUSY,
  SET_SOCKET_EVENT_LISTENER,
} from '@/store/mutations.type'
import { RootState } from '.'

const storeOptions: StoreOptions<RootState> = {
  modules: {
    session,
    chat,
  },
  state: {
    isBusy: false,
    socket: new Socket(),
  },
  getters: {
    [GET_SOCKET]: state => state.socket,
    [IS_BUSY]: state => state.isBusy,
  },
  mutations: {
    [SET_BUSY]: (state, enable) => {
      state.isBusy = enable
    },
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

export default storeOptions
