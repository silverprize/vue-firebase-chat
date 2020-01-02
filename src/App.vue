<template>
  <div id="app">
    <router-view />
    <div
      v-if="false"
      class="global-spinner"
    >
      <VSpinner />
    </div>
  </div>
</template>

<script>
import '@/scss/index.scss'
import { Component, Vue } from 'vue-property-decorator'
import VSpinner from '@/components/VSpinner/VSpinner.vue'

@Component({
  components: { VSpinner },
})
export default class App extends Vue {
}
</script>
