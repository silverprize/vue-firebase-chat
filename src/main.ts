import 'vue-tsx-support/enable-check'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Component from 'vue-class-component'

Vue.config.productionTip = false

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
])

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
