import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import '@/scss/index.scss'
import { IS_BUSY } from '@/store/root/getters.type'
import VSpinner from '@/components/VSpinner/VSpinner'
import DialogContainer from '@/components/DialogContainer/DialogContainer'

@Component
export default class App extends Vue {
  @Getter(IS_BUSY)
  readonly isBusy!: boolean

  render() {
    return (
      <div id="app">
        <router-view />
        <DialogContainer />
        <div class="global-spinner" v-show={this.isBusy}>
          <VSpinner />
        </div>
      </div>
    )
  }
}
