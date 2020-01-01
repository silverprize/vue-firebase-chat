import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RouteNames from '@/router/route-names'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/chat-rooms',
    name: RouteNames.ChatRoomList,
    component: () => import(/* webpackChunkName: "chat-room-list" */ '@/views/ChatRoomList.vue'),
  },
  {
    path: '/chat-rooms/:id',
    name: RouteNames.ChatRoom,
    component: () => import(/* webpackChunkName: "chat-room" */ '@/views/ChatRoom.vue'),
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
