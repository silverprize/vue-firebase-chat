import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import VModal from '@/components/VModal/VModal'

interface DialogConfirmInvitationProps {
  inviter: string;
  room: string;
}

interface DialogConfirmInvitationEvents {
  onOk(): void
  onClose(): void
}

@Component
export default class DialogConfirmInvitation extends tsx.Component<DialogConfirmInvitationProps, DialogConfirmInvitationEvents> {
  @Prop({ type: String, required: true })
  private readonly inviter!: string

  @Prop({ type: String, required: true })
  private readonly room!: string

  render() {
    return (
      <VModal
        okLabel="수락"
        onOk={() => this.$emit('ok')}
        onClose={() => this.$emit('close')}
      >
        <div class="dialog-content">
          <div class="dialog-content-message">
            <strong>{this.inviter}</strong> 님이,
          </div>
          <div class="dialog-content-message">
            <strong>{this.room}</strong> 방으로 초대했습니다.
          </div>
        </div>
      </VModal>
    )
  }
}
