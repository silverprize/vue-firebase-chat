import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'

const chatRoom: RouteConfig = {
  path: '/rooms/:roomId',
  name: RouteName.ChatRoom,
  component: () => import(/* webpackChunkName: "chat-room" */ '@/views/chat-room/PageChatRoom'),
}

export default chatRoom
