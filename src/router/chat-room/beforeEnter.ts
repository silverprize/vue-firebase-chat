import { Location, Route } from 'vue-router'
import store from '@/store'
import { CLEAR } from '@/store/chat/mutations.type'

export default async (to: Route, from: Route, next: (to?: Location) => void) => {
  store.commit(CLEAR)
  next()
}
