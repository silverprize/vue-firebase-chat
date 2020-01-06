import Vue from 'vue'
import Vuex from 'vuex'
import storeOptions from '@/store/options'
import Socket from '@/services/Socket'

Vue.use(Vuex)

export type RootState = {
  isBusy: boolean
  socket: Socket
}

export default new Vuex.Store(storeOptions)
