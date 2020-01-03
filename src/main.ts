import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from 'vue-class-component'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ko'

Vue.config.productionTip = false

dayjs.extend(LocalizedFormat)
dayjs.locale('ko')

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
])

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
