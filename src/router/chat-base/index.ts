import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'
import chatRoom from '../chat-room'
import chatRoomList from '../chat-room-list'

const chat: RouteConfig = {
  path: '/chat',
  component: () => import(/* webpackChunkName: "chat" */ '@/views/chat-base/PageChatBase'),
  redirect: { name: RouteName.ChatRoomList },
  children: [
    chatRoom,
    chatRoomList,
  ],
}

export default chat
