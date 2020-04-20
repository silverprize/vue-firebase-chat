import { Vue } from 'vue-property-decorator'
import store from '@/store'
import { SET_BUSY } from '@/store/root/mutations.type'

export function WithGlobalSpinner(target: Vue, key: string, descriptor: TypedPropertyDescriptor<any>) {
  const method: Function = descriptor.value
  descriptor.value = async function (...args: any[]) {
    store.commit(SET_BUSY, true)
    try {
      await method.apply(this, args)
    } finally {
      store.commit(SET_BUSY, false)
    }
  }
}
