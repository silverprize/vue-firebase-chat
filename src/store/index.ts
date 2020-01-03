import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'
import session from './session'
import chat from './chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    session,
    chat,
  },
})
