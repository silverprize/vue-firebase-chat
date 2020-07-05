import Vue from 'vue'
import Vuex from 'vuex'
import { rootModule } from '@/store/root'

Vue.use(Vuex)

export const store = new Vuex.Store(rootModule)
