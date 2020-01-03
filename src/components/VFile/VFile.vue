<template>
  <label>
    <slot />
    <input
      ref="fileElement"
      v-bind="$attrs"
      type="file"
      hidden
      @change="onChange"
    >
  </label>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class VFile extends Vue {
  @Ref()
  readonly fileElement!: HTMLInputElement

  onChange({ target }: Event) {
    this.$emit('files', (target as HTMLInputElement).files)
    this.reset()
  }

  reset() {
    this.fileElement.value = ''
  }
}
</script>
