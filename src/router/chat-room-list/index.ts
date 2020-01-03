import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'
import beforeEnter from '@/router/chat-room-list/beforeEnter'

const chatRooms: RouteConfig = {
  path: 'rooms',
  name: RouteName.ChatRoomList,
  component: () => import(/* webpackChunkName: "chat-room-list" */ '@/views/chat-room-list/PageChatRoomList.vue'),
  beforeEnter, // 새로 받아오기 전에 방목록, 사람목록 비우기
}

export default chatRooms
