import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import './DialogContainer.scss'
import DialogMessage from '@/components/DialogMessage/DialogMessage'
import {
  ConfirmInvitationDialog,
  DialogType,
  InvitationDialog,
  MessageDialog,
} from '@/store/dialog/types'
import {
  GET_CURRENT_CONFIRM_INVITATION_DIALOG,
  GET_CURRENT_INVITATION_DIALOG,
  GET_CURRENT_MESSAGE_DIALOG,
} from '@/store/dialog/getters.type'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation'
import { NEXT_DIALOG } from '@/store/dialog/actions.type'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation'

@Component
export default class DialogContainer extends Vue {
  @Getter(GET_CURRENT_MESSAGE_DIALOG)
  private readonly currentMessageDialog!: MessageDialog.Params | null

  @Getter(GET_CURRENT_INVITATION_DIALOG)
  private readonly currentInvitationDialog!: InvitationDialog.Params | null

  @Getter(GET_CURRENT_CONFIRM_INVITATION_DIALOG)
  private readonly currentConfirmInvitationDialog!: ConfirmInvitationDialog.Params | null

  @Action(NEXT_DIALOG)
  private readonly nextDialog!: (dialogType: DialogType) => void

  private handleOk(dialogType: DialogType, dialog: { handleOk?: (result: any) => void }, result?: any) {
    dialog.handleOk?.(result)
    this.nextDialog(dialogType)
  }

  private handleClose(dialogType: DialogType, dialog: { handleClose?: () => void }) {
    dialog.handleClose?.()
    this.nextDialog(dialogType)
  }

  render() {
    return (
      <div class="dialog-container">
        {this.currentInvitationDialog &&
          <DialogInvitation params={this.currentInvitationDialog}
            onOk={(uid) => this.handleOk(DialogType.INVITATION, this.currentInvitationDialog!, uid)}
            onClose={() => this.handleClose(DialogType.INVITATION, this.currentInvitationDialog!)}
          />
        }
        {this.currentConfirmInvitationDialog &&
          <DialogConfirmInvitation params={this.currentConfirmInvitationDialog}
            onOk={(roomId) => this.handleOk(DialogType.CONFIRM_INVITATION, this.currentConfirmInvitationDialog!, roomId)}
            onClose={() => this.handleClose(DialogType.CONFIRM_INVITATION, this.currentConfirmInvitationDialog!)}
          />
        }
        {this.currentMessageDialog &&
          <DialogMessage params={this.currentMessageDialog}
            onOk={() => this.handleOk(DialogType.MESSAGE, this.currentMessageDialog!)}
            onClose={() => this.handleClose(DialogType.MESSAGE, this.currentMessageDialog!)}
          />
        }
      </div>
    )
  }
}
