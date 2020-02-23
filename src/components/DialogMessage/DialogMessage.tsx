import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import VModal from '@/components/VModal/VModal'

interface DialogMessageProps {
  messageList: string[]
  okLabel?: string;
  closeLabel?: string;
}

interface DialogMessageEvents {
  onOk(): void
  onClose(): void
}

@Component
export default class DialogMessage extends tsx.Component<DialogMessageProps, DialogMessageEvents> {
  @Prop({
    type: Array,
    required: true,
    validator: (value: string[]): boolean => value && value.length > 0,
  })
  private readonly messageList!: string[]

  @Prop(String)
  private readonly okLabel!: string

  @Prop(String)
  private readonly closeLabel!: string

  render() {
    return (
      <VModal
        okLabel={this.okLabel}
        closeLabel={this.closeLabel}
        onOk={() => this.$emit('ok')}
        onClose={() => this.$emit('close')}
      >
        <div class="dialog-content">
          {this.messageList.map((message, index) => (
            <div
              key={index}
              class="dialog-content-message"
            >
              {message}
            </div>
          ))}
        </div>
      </VModal>
    )
  }
}
