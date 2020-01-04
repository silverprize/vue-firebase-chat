import { RES_JOINED } from "@/../server/protocol.js"import { RES_LEFT } from "@/../server/protocol.js"
<template>
  <div class="chat">
    <RouterView />
    <DialogInvitation
      v-if="dialogProps[Dialog.INVITATION].visible"
      :people="dialogProps[Dialog.INVITATION].people"
      @ok="inviteeSelected"
      @close="closeDialog(Dialog.INVITATION)"
    />
    <DialogConfirmInvitation
      v-if="dialogProps[Dialog.CONFIRM_INVITATION].visible"
      :inviter="dialogProps[Dialog.CONFIRM_INVITATION].inviter"
      :room="dialogProps[Dialog.CONFIRM_INVITATION].room"
      @ok="invitationAccepted"
      @close="invitationRejected"
    />
    <DialogMessage
      v-if="dialogProps[Dialog.MESSAGE].visible"
      :message-list="dialogProps[Dialog.MESSAGE].messageList"
      :ok-label="dialogProps[Dialog.MESSAGE].okLabel"
      @ok="messageRead"
      @close="closeDialog(Dialog.MESSAGE)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { Action, Mutation } from 'vuex-class'

import './PageChat.scss'
import { OPEN_INVITATION_DIALOG } from '@/services/event-bus/event-bus.event.name'
import { FETCH_ROOM_LIST } from '@/store/chat/actions.type'
import { RES_INVITED, RES_JOINED, RES_LEFT } from '@/../server/protocol.js'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation.vue'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation.vue'
import VPage from '@/components/VPage/VPage.vue'
import { InvitationRequest } from '@/types'
import eventBus from '@/services/event-bus'
import { disconnect, fetchAllPeople, invite, removeSocketEventListener, setSocketEventListener } from '@/services/chat'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import RouteName from '@/router/route.name'
import { CLEAR } from '@/store/session/mutations.type'
import DialogMessage from '@/components/DialogMessage/DialogMessage.vue'

enum Dialog {
  INVITATION,
  CONFIRM_INVITATION,
  MESSAGE,
}
const DISCONNECT = 'disconnect'

@Component({
  components: { DialogMessage, VPage, DialogConfirmInvitation, DialogInvitation, ChatFrame },
})
export default class PageChat extends mixins(GlobalSpinnerHandler) {
  dialogProps = {
    [Dialog.INVITATION]: {
      visible: false,
      room: '',
      people: [] as string[],
    },
    [Dialog.CONFIRM_INVITATION]: {
      visible: false,
      room: '',
      inviter: '',
      invitationRequestList: [] as InvitationRequest[],
    },
    [Dialog.MESSAGE]: {
      visible: false,
      messageList: [] as string[],
      okLabel: '',
    },
  }

  readonly Dialog = Dialog

  get isInLobby() {
    return this.$route.name === RouteName.ChatRoomList
  }

  @Mutation(CLEAR)
  readonly clearSession!: () => void

  @Action(FETCH_ROOM_LIST)
  readonly updateRoomList!: () => Promise<void>

  async inviteeSelected(chatId: string) {
    const dialogProps = this.dialogProps[Dialog.INVITATION]
    this.closeDialog(Dialog.INVITATION)
    this.startSpinner()
    await invite({
      chatId,
      room: dialogProps.room,
    })
    this.stopSpinner()
  }

  async invitationAccepted() {
    const { room } = this.dialogProps[Dialog.CONFIRM_INVITATION]
    this.$router.push({ name: RouteName.ChatRoom, params: { room } })
    this.closeDialog(Dialog.CONFIRM_INVITATION)
    this.nextInvitation()
  }

  invitationRejected() {
    this.closeDialog(Dialog.CONFIRM_INVITATION)
    this.nextInvitation()
  }

  async nextInvitation() {
    const { invitationRequestList } = this.dialogProps[Dialog.CONFIRM_INVITATION]
    const next = invitationRequestList.pop()
    if (next) {
      setTimeout(() => {
        this.openConfirmInvitationDialog({
          chatId: next.inviter,
          room: next.room,
        })
      }, 200)
    }
  }

  messageRead() {
    this.clearSession()
    this.$router.replace({ name: RouteName.Main })
  }

  async openInvitationDialog(targetRoom: string) {
    const dialogProps = this.dialogProps[Dialog.INVITATION]
    dialogProps.room = targetRoom
    dialogProps.people = await fetchAllPeople()
    this.openDialog(Dialog.INVITATION)
  }

  openConfirmInvitationDialog({ chatId, room }: { chatId: string, room: string }) {
    const dialogProps = this.dialogProps[Dialog.CONFIRM_INVITATION]
    if (dialogProps.visible) {
      dialogProps.invitationRequestList.push({
        inviter: chatId,
        room,
      })
    } else {
      dialogProps.inviter = chatId
      dialogProps.room = room
      this.openDialog(Dialog.CONFIRM_INVITATION)
    }
  }

  openDisconnectAlertDialog() {
    const dialogProps = this.dialogProps[Dialog.MESSAGE]
    dialogProps.messageList = [
      '접속이 끊겼습니다.',
      '접속페이지로 이동합니다.',
    ]
    dialogProps.okLabel = '이동'
    this.openDialog(Dialog.MESSAGE)
  }

  openDialog(dialog: Dialog) {
    this.dialogProps[dialog].visible = true
  }

  closeDialog(dialog: Dialog) {
    this.dialogProps[dialog].visible = false
  }

  async socketEventReceived(event: string, data: any) {
    switch (event) {
      case RES_JOINED:
      case RES_LEFT:
        if (this.isInLobby) {
          await this.updateRoomList()
        }
        break
      case RES_INVITED:
        this.openConfirmInvitationDialog(data)
        break
      case DISCONNECT:
        this.openDisconnectAlertDialog()
        break
    }
  }

  created() {
    setSocketEventListener([
      DISCONNECT,
      RES_JOINED,
      RES_LEFT,
      RES_INVITED,
    ], this.socketEventReceived)
    eventBus.listen(this, OPEN_INVITATION_DIALOG, this.openInvitationDialog)
  }

  destroyed() {
    removeSocketEventListener(this.socketEventReceived)
  }
}
</script>
