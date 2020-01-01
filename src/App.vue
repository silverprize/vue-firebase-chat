<template>
  <div id="app">
    <router-view />
    <div v-if="false" class="global-spinner">
      <spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Spinner },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './scss';

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss">
.global-spinner {
  @include flex(null, center, center);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
