import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import VModal from '@/components/VModal/VModal'
import { MessageDialog } from '@/store/dialog/types'

interface Props {
  params: MessageDialog.Params;
}

interface Events {
  onOk(): void
  onClose(): void
}

@Component
export default class DialogMessage extends tsx.Component<Props, Events> {
  @Prop(Object)
  private readonly params!: MessageDialog.Params

  get message() {
    return ([] as string[]).concat(this.params.message).map((message, index) => (
      <div
        key={index}
        class="dialog-content-message"
      >
        {message}
      </div>
    ))
  }

  render() {
    return (
      <VModal
        okLabel={this.params.okText}
        closeLabel={this.params.closeText}
        onOk={() => this.$emit('ok')}
        onClose={() => this.$emit('close')}
      >
        <div class="dialog-content">
          {this.message}
        </div>
      </VModal>
    )
  }
}
