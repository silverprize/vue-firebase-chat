<template functional>
  <div
    class="alert"
    :class="[data.staticClass, data.class]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import './VAlert.scss'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: true,
})
export default class VAlert extends Vue {}
</script>
