import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeEach from './beforeEach'
import routerOptions from './options'

Vue.use(VueRouter)

const router = new VueRouter(routerOptions)

// 접속 페이지가 아닌 다른 페이지로 접근 했을때,
// 서버 연결중이 아니면 접속 페이지로 이동하도록 확인
router.beforeEach(beforeEach)

export default router
