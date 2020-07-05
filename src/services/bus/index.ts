import { Vue } from 'vue-property-decorator'

export const bus = new Vue({
  methods: {
    on(this: Vue, listener: Vue, event: string, handler: Function) {
      this.$on(event, handler)
      listener.$on('hook:destroyed', () => this.$off(event, handler))
    },
  },
})
