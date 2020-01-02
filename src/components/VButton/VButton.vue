<template functional>
  <button
    class="button"
    :class="[data.staticClass, data.class, `button_${props.variant || 'light'}`]"
    :type="data.attrs && data.attrs.type || 'button'"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import './VButton.scss'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VButton extends Vue {}
</script>
