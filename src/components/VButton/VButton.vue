<template>
  <button
    class="button"
    :class="styleVariant"
    :type="buttonType"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './VButton.scss'

@Component
export default class VButton extends Vue {
  get buttonType() {
    return this.type || 'button'
  }

  get styleVariant() {
    return this.variant ? `button_${this.variant}` : ''
  }

  @Prop(String)
  readonly variant!: string

  @Prop(String)
  readonly type!: string
}
</script>
