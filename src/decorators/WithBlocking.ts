import { createDecorator } from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { Dictionary } from '@/types/common'

const storage: Dictionary<any> = {}

const factory = createDecorator((options, prop) => {
  const method = options.methods?.[prop]
  if (!method) {
    throw new Error(`${prop} is ${method}`)
  }

  options.methods![prop] = function (...args: any[]) {
    const key = `${options.name}.${prop}`
    if (storage[key]) {
      console.warn(`${key} is in progress.`)
      return
    }
    const result = method.apply(this, args)
    if (result instanceof Promise) {
      storage[key] = result.finally(() => {
        delete storage[key]
      })
    }
    return result
  }
})

export function WithBlocking(vue: Vue, key: string) {
  return factory(vue, key)
}
