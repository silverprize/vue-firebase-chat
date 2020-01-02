import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RouteNames from '@/router/route-names'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: RouteNames.Main,
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/PageMain.vue'),
  },
  {
    path: '/chat-rooms',
    name: RouteNames.ChatRoomList,
    component: () => import(/* webpackChunkName: "chat-room-list" */ '@/views/chat-rooms/PageChatRoomList.vue'),
  },
  {
    path: '/chat-rooms/:id',
    name: RouteNames.ChatRoom,
    component: () => import(/* webpackChunkName: "chat-room" */ '@/views/chat-rooms/PageChatRoom.vue'),
  },
  {
    path: '*',
    redirect: { name: RouteNames.Main },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
