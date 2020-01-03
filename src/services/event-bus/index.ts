import Vue from 'vue'

const EventBus = Vue.extend({
  methods: {
    listen(vm: Vue, eventName: string, callback: (args: any) => void) {
      this.$on(eventName, callback)
      vm.$on('hook:destroyed', () => {
        this.$off(eventName, callback)
      })
    },
    send(eventName: string, args?: any) {
      this.$emit(eventName, args)
    },
  },
})

export default new EventBus()
