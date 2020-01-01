<template functional>
  <div class="spinner" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Spinner extends Vue {
}
</script>

<style lang="scss">
@keyframes spinner {
  to { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 0.3rem solid $yellow-color;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner .75s linear infinite;
}
</style>
