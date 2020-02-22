import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import './VButton.scss'

interface VButtonProps {
  type?: string;
  variant?: string;
  disabled?: boolean;
}

interface VButtonEvents {
  onClick($event: Event): void
}

@Component
export default class VButton extends tsx.Component<VButtonProps, VButtonEvents> {
  get buttonType() {
    return this.type || 'button'
  }

  get styleVariant() {
    const style = ['button']
    if (this.variant) {
      style.push(`button_${this.variant}`)
    }
    return style
  }

  @Prop(String)
  readonly variant!: string

  @Prop(String)
  readonly type!: string

  render() {
    return (
      <button
        class={this.styleVariant}
        type={this.buttonType}
        on={this.$listeners}
      >
        {this.$slots.default}
      </button>
    )
  }
}
