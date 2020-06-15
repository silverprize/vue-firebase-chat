import { RouteConfig, RouterOptions } from 'vue-router'
import main from '@/router/main'
import chatRoom from '@/router/chat-room'
import chatRoomList from '@/router/chat-room-list'
import RouteName from '@/router/route.name'

const routes: RouteConfig[] = [
  main,
  chatRoomList,
  chatRoom,
  {
    path: '*',
    redirect: { name: RouteName.Main },
  },
]

const routerOptions: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
}

export default routerOptions
