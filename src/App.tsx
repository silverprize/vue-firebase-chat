import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import '@/scss/index.scss'
import { IS_BUSY } from '@/store/getters.type'
import VSpinner from '@/components/VSpinner/VSpinner'

@Component({
  components: { VSpinner },
})
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
