import { Component, Ref } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

interface VFileEvents {
  onFileSelect: (fileList: File[]) => void
}

@Component({
  inheritAttrs: false,
})
export default class VFile extends tsx.Component<{}, {}, VFileEvents> {
  @Ref()
  private readonly fileElement!: HTMLInputElement

  private onChange() {
    this.$emit('onSelectFile', this.fileElement.files)
    this.reset()
  }

  reset() {
    this.fileElement.value = ''
  }

  render() {
    return (
      <label>
        {this.$slots.default}
        <input
          {...this.$attrs}
          ref="fileElement"
          type="file"
          hidden
          onChange={this.onChange}
        />
      </label>
    )
  }
}
