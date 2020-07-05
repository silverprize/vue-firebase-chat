import Vue from 'vue'
import VueRouter, { Location, Route } from 'vue-router'
import routerOptions from './options'
import RouteName from '@/router/route.name'
import { store } from '@/store'
import { IS_SIGNED_IN } from '@/store/session/getters.type'

Vue.use(VueRouter)

const router = new VueRouter(routerOptions)

async function checkSession(to: Route, from: Route, next: (to?: Location) => void) {
  if (to.name !== RouteName.Main && !store.getters[IS_SIGNED_IN]) {
    next({ name: RouteName.Main })
  } else {
    next()
  }
}

// 접속 페이지가 아닌 다른 페이지로 접근 했을때,
// 서버 연결중이 아니면 접속 페이지로 이동하도록 확인
router.beforeEach(checkSession)

export { router }
