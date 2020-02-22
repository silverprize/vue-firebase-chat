import { RouteConfig } from 'vue-router'
import RouteName from '@/router/route.name'

const main: RouteConfig = {
  path: '/',
  name: RouteName.Main,
  component: () => import(/* webpackChunkName: "main" */ '@/views/main/PageMain'),
}
export default main
