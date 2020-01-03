<template>
  <div id="app">
    <RouterView />
    <div
      v-if="isSpinnerRunning"
      class="global-spinner"
    >
      <VSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import '@/scss/index.scss'
import VSpinner from '@/components/VSpinner/VSpinner.vue'
import { IS_BUSY } from '@/store/global/getters.type'

@Component({
  components: { VSpinner },
})
export default class App extends Vue {
  @Getter(IS_BUSY)
  readonly isSpinnerRunning!: boolean
}
</script>
