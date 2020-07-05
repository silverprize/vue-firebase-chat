import { createDecorator } from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { store } from '@/store'
import { SET_BUSY } from '@/store/root/mutations.type'
import { ComponentOptions } from 'vue'

const factory = createDecorator((options: ComponentOptions<Vue>, prop: string) => {
  const method = options.methods?.[prop] || (options as { [key: string]: any })[prop]
  const container: any = options.methods?.[prop] ? options.methods : options

  if (!method) {
    throw new Error(`${prop} is ${method}.`)
  }

  container[prop] = async function (this: Vue, ...args: any[]) {
    store.commit(SET_BUSY, true)
    try {
      return await method.apply(this, args)
    } finally {
      store.commit(SET_BUSY, false)
    }
  }
})

export function WithGlobalSpinner(target: Vue, key: string) {
  factory(target, key)
}
