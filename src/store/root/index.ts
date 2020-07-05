import { StoreOptions } from 'vuex'
import { sessionModule } from '@/store/session'
import { chatModule } from '@/store/chat'
import { dialogModule } from '@/store/dialog'
import { IS_BUSY } from './getters.type'
import { SET_BUSY } from './mutations.type'

interface RootState {
  isBusy: boolean;
}

const rootModule: StoreOptions<RootState> = {
  modules: {
    session: sessionModule,
    chat: chatModule,
    dialog: dialogModule,
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
  rootModule,
}
