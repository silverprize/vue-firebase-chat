<template>
  <div class="chat-base">
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
      :close-label="dialogProps[Dialog.MESSAGE].closeLabel"
      @ok="messageRead"
      @close="messageClosed"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { Action, Mutation } from 'vuex-class'

import './PageChatBase.scss'
import { OPEN_INVITATION_DIALOG } from '@/services/eventBus/event.name'
import { FETCH_ALL_PEOPLE, UPDATE_ROOM_LIST, SEND_INVITATION } from '@/store/chat/actions.type'
import { BUILTIN_DISCONNECT, RES_INVITED, RES_JOINED, RES_LEFT } from '@/../server/protocol.js'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation.vue'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation.vue'
import VPage from '@/components/VPage/VPage.vue'
import eventBus from '@/services/eventBus'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import RouteName from '@/router/route.name'
import DialogMessage from '@/components/DialogMessage/DialogMessage.vue'
import { REMOVE_SOCKET_EVENT_LISTENER, SET_SOCKET_EVENT_LISTENER } from '@/store/mutations.type'
import { CLEAR } from '@/store/session/mutations.type'

type InvitationRequest = {
  inviter: string
  room: string
}

type MessageRequest = {
  messageList: string[]
  okLabel: string
  closeLabel: string
}

enum Dialog {
  INVITATION,
  CONFIRM_INVITATION,
  MESSAGE,
}

@Component({
  components: { DialogMessage, VPage, DialogConfirmInvitation, DialogInvitation, ChatFrame },
})
export default class PageChatBase extends mixins(GlobalSpinnerHandler) {
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
      closeLabel: '',
      messageRequestList: [] as MessageRequest[],
      disconnected: false,
    },
  }

  readonly Dialog = Dialog

  get isInLobby() {
    return this.$route.name === RouteName.ChatRoomList
  }

  @Mutation(SET_SOCKET_EVENT_LISTENER)
  readonly setSocketEventListener!: (params: { event: string[], callback: Function }) => void

  @Mutation(REMOVE_SOCKET_EVENT_LISTENER)
  readonly removeSocketEventListener!: (callback: Function) => void

  @Mutation(CLEAR)
  readonly clearSession!: () => void

  @Action(UPDATE_ROOM_LIST)
  readonly updateRoomList!: () => Promise<void>

  @Action(FETCH_ALL_PEOPLE)
  readonly fetchAllPeople!: () => Promise<string[]>

  @Action(SEND_INVITATION)
  readonly sendInvitation!: (params: { chatId: string, room: string}) => Promise<void>

  async inviteeSelected(chatId: string) {
    const dialogProps = this.dialogProps[Dialog.INVITATION]
    this.closeDialog(Dialog.INVITATION)
    this.startSpinner()
    await this.sendInvitation({
      chatId,
      room: dialogProps.room,
    })
    this.stopSpinner()
  }

  invitationAccepted() {
    const { room, invitationRequestList } = this.dialogProps[Dialog.CONFIRM_INVITATION]
    this.$router.push({ name: RouteName.ChatRoom, params: { room } })
    this.closeDialog(Dialog.CONFIRM_INVITATION)
    this.nextRequest(invitationRequestList, Dialog.CONFIRM_INVITATION)
  }

  invitationRejected() {
    this.closeDialog(Dialog.CONFIRM_INVITATION)
    this.nextRequest(this.dialogProps[Dialog.CONFIRM_INVITATION].invitationRequestList, Dialog.CONFIRM_INVITATION)
  }

  async nextRequest(requestList: any[], dialog: Dialog) {
    const next = requestList.pop()
    if (next) {
      setTimeout(() => {
        if (dialog === Dialog.CONFIRM_INVITATION) {
          this.openConfirmInvitationDialog({
            chatId: next.inviter,
            room: next.room,
          })
        } else if (dialog === Dialog.MESSAGE) {
          this.openMessageDialog(next)
        }
      }, 200)
    }
  }

  messageRead() {
    const { messageRequestList, disconnected } = this.dialogProps[Dialog.MESSAGE]
    if (disconnected) {
      this.clearSession()
      this.$router.replace({ name: RouteName.Main })
    } else {
      this.nextRequest(messageRequestList, Dialog.MESSAGE)
    }
  }

  messageClosed() {
    this.nextRequest(this.dialogProps[Dialog.MESSAGE].messageRequestList, Dialog.MESSAGE)
  }

  async openInvitationDialog(targetRoom: string) {
    const dialogProps = this.dialogProps[Dialog.INVITATION]
    dialogProps.room = targetRoom
    dialogProps.people = await this.fetchAllPeople()
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

  openMessageDialog(args: { messageList: string[], okLabel: string, closeLabel: string, disconnected: boolean }) {
    const dialogProps = this.dialogProps[Dialog.MESSAGE]
    if (dialogProps.visible) {
      dialogProps.messageRequestList.push({
        ...args,
      })
    } else {
      dialogProps.messageList = args.messageList
      dialogProps.okLabel = args.okLabel
      dialogProps.closeLabel = args.closeLabel
      dialogProps.disconnected = args.disconnected
      this.openDialog(Dialog.MESSAGE)
    }
  }

  openDisconnectAlertDialog() {
    this.openMessageDialog({
      messageList: [
        '접속이 끊겼습니다.',
        '접속페이지로 이동합니다.',
      ],
      okLabel: '이동',
      closeLabel: '',
      disconnected: true,
    })
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
      case BUILTIN_DISCONNECT:
        this.openDisconnectAlertDialog()
        break
    }
  }

  created() {
    this.setSocketEventListener({
      event: [
        BUILTIN_DISCONNECT,
        RES_JOINED,
        RES_LEFT,
        RES_INVITED,
      ],
      callback: this.socketEventReceived,
    })
    eventBus.listen(this, OPEN_INVITATION_DIALOG, this.openInvitationDialog)
  }

  destroyed() {
    this.removeSocketEventListener(this.socketEventReceived)
  }
}
</script>
