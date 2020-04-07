import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { SET_BUSY } from '@/store/root/mutations.type'

@Component
export default class GlobalSpinnerHandler extends Vue {
  @Mutation(SET_BUSY)
  readonly setEnableSpinner!: (enable: boolean) => void

  startSpinner() {
    this.setEnableSpinner(true)
  }

  stopSpinner() {
    this.setEnableSpinner(false)
  }
}
