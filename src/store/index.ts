import Vue from 'vue'
import Vuex from 'vuex'
import storeOptions from '@/store/options'
import Socket from '@/services/socket'

Vue.use(Vuex)

export interface RootState {
  isBusy: boolean;
  socket: Socket;
}

export default new Vuex.Store(storeOptions)
