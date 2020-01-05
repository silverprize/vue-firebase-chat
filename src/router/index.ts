import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import beforeEach from './beforeEach'
import RouteName from '@/router/route.name'
import main from '@/router/main'
import chat from '@/router/chat-base'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  main,
  chat,
  {
    path: '*',
    redirect: { name: RouteName.Main },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 접속 페이지가 아닌 다른 페이지로 접근 했을때,
// 서버 연결중이 아니면 접속 페이지로 이동하도록 확인
router.beforeEach(beforeEach)

export default router
