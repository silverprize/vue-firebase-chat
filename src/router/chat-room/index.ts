import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'
import beforeEnter from '@/router/chat-room/beforeEnter'

const chatRoom: RouteConfig = {
  path: 'rooms/:name',
  name: RouteName.ChatRoom,
  component: () => import(/* webpackChunkName: "chat-room" */ '@/views/chat-room/PageChatRoom.vue'),
  beforeEnter, // 새로 받아오기 전에 방목록, 사람목록 비우기
}

export default chatRoom
