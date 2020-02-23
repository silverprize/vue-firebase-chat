import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'

const chatRooms: RouteConfig = {
  path: 'rooms',
  name: RouteName.ChatRoomList,
  component: () => import(/* webpackChunkName: "chat-room-list" */ '@/views/chat-room-list/PageChatRoomList'),
}

export default chatRooms
