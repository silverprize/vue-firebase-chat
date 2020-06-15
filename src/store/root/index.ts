import { StoreOptions } from 'vuex'
import session from '@/store/session'
import chat from '@/store/chat'
import dialog from '@/store/dialog'
import { IS_BUSY } from './getters.type'
import { SET_BUSY } from './mutations.type'

interface RootState {
  isBusy: boolean;
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    session,
    chat,
    dialog,
  },
  state: () => ({
    isBusy: true,
  }),
  getters: {
    [IS_BUSY]: state => state.isBusy,
  },
  mutations: {
    [SET_BUSY](state, enable) {
      state.isBusy = enable
    },
  },
}

export {
  RootState,
}
export default storeOptions
