import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from '@/store/root'

Vue.use(Vuex)

export default new Vuex.Store(rootModule)
