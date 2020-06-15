import { Component, Ref } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import './VFile.scss'

interface VFileEvents {
  onSelectFile(fileList: File[]): void
}

@Component({
  inheritAttrs: false,
})
export default class VFile extends tsx.Component<{}, VFileEvents> {
  @Ref()
  private readonly fileElement!: HTMLInputElement

  private onChange() {
    this.$emit('selectFile', [].slice.apply(this.fileElement.files))
    this.reset()
  }

  reset() {
    this.fileElement.value = ''
  }

  render() {
    return (
      <label staticClass="file" class={{ disabled: this.$attrs.disabled }}>
        {this.$slots.default}
        <input
          attrs={this.$attrs}
          ref="fileElement"
          type="file"
          hidden
          onChange={this.onChange}
        />
      </label>
    )
  }
}
