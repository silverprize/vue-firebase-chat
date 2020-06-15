import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import VModal from '@/components/VModal/VModal'
import { ConfirmInvitationDialog } from '@/store/dialog/types'

interface Props {
  params: ConfirmInvitationDialog.Params;
}

interface Events {
  onOk(roomId: string): void
  onClose(): void
}

@Component
export default class DialogConfirmInvitation extends tsx.Component<Props, Events> {
  @Prop(Object)
  private readonly params!: ConfirmInvitationDialog.Params

  render() {
    return (
      <VModal
        okLabel="수락"
        onOk={() => this.$emit('ok', this.params.room.id)}
        onClose={() => this.$emit('close')}
      >
        <div class="dialog-content">
          <div class="dialog-content-message">
            <strong>{this.params.inviter.name}</strong> 님이,
          </div>
          <div class="dialog-content-message">
            <strong>{this.params.room.name}</strong> 방으로 초대했습니다.
          </div>
        </div>
      </VModal>
    )
  }
}
