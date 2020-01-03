<template>
  <div class="chat">
    <RouterView />
    <DialogInvitation
      v-if="dialogVisibilities[Dialog.INVITATION]"
      @ok="inviteeSelected"
      @close="closeDialog(Dialog.INVITATION)"
    />
    <DialogConfirmInvitation
      v-if="dialogVisibilities[Dialog.CONFIRM_INVITATION]"
      :inviter="activeInviteRequest.inviter"
      :room="activeInviteRequest.room"
      @ok="invitationAccepted"
      @close="closeDialog(Dialog.CONFIRM_INVITATION)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './PageChat.scss'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation.vue'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation.vue'
import VPage from '@/components/VPage/VPage.vue'
import { InvitationRequest } from '@/types'
import eventBus from '@/services/event-bus'
import { OPEN_CONFIRM_INVITATION_DIALOG, OPEN_INVITATION_DIALOG } from '@/services/event-bus/event-bus.event.name'

enum Dialog {
  INVITATION,
  CONFIRM_INVITATION,
}

@Component({
  components: { VPage, DialogConfirmInvitation, DialogInvitation, ChatFrame },
})
export default class PageChat extends Vue {
  dialogVisibilities = Object.keys(Dialog).reduce((map, value: string) => {
    map[value] = false
    return map
  }, {} as { [key: string]: boolean })

  activeInviteRequest: InvitationRequest | null = null

  invitationRequestList: InvitationRequest[] = []

  readonly Dialog = Dialog

  openInvitationDialog() {
    this.openDialog(Dialog.INVITATION)
  }

  openConfirmInvitationDialog() {
    this.openDialog(Dialog.CONFIRM_INVITATION)
  }

  inviteeSelected(id: string) {
    this.closeDialog(Dialog.INVITATION)
    this.activeInviteRequest = {
      inviter: '1',
      room: '1',
    }
    this.openDialog(Dialog.CONFIRM_INVITATION)
  }

  invitationAccepted() {
    this.closeDialog(Dialog.CONFIRM_INVITATION)
  }

  openDialog(dialog: Dialog) {
    this.dialogVisibilities[dialog] = true
  }

  closeDialog(dialog: Dialog) {
    this.dialogVisibilities[dialog] = false
  }

  created() {
    eventBus.listen(this, OPEN_INVITATION_DIALOG, this.openInvitationDialog)
    eventBus.listen(this, OPEN_CONFIRM_INVITATION_DIALOG, this.openConfirmInvitationDialog)
  }
}
</script>
