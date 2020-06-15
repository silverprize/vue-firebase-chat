import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
])

router.onError((err) => console.warn(err))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
