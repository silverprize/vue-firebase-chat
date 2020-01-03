import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import beforeEach from './beforeEach'
import RouteName from '@/router/route.name'
import main from '@/router/main'
import chat from '@/router/chat'

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

// 서버 연결중이 아니면 아이디 입력으로 이동
router.beforeEach(beforeEach)

export default router
