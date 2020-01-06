import { RouteConfig, RouterOptions } from 'vue-router'
import main from '@/router/main'
import chat from '@/router/chat-base'
import RouteName from '@/router/route.name'

const routes: RouteConfig[] = [
  main,
  chat,
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
