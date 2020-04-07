import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import '@/scss/index.scss'
import { IS_BUSY } from '@/store/root/getters.type'
import VSpinner from '@/components/VSpinner/VSpinner'

@Component
export default class App extends Vue {
  @Getter(IS_BUSY)
  readonly isSpinnerRunning!: boolean

  render() {
    return (
      <div id="app">
        <router-view />
        {this.isSpinnerRunning &&
          <div class="global-spinner">
            <VSpinner />
          </div>
        }
      </div>
    )
  }
}
