import { Component, Vue } from 'vue-property-decorator'
import { Action, Mutation } from 'vuex-class'

import './PageChatBase.scss'
import { OPEN_INVITATION_DIALOG } from '@/services/eventBus/event.name'
import { FETCH_ALL_PEOPLE, SEND_INVITATION, UPDATE_ROOM_LIST } from '@/store/chat/actions.type'
import { BUILTIN_DISCONNECT, RES_INVITED, RES_JOINED, RES_LEFT } from '@/../server/protocol'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation'
import eventBus from '@/services/eventBus'
import RouteName from '@/router/route.name'
import DialogMessage from '@/components/DialogMessage/DialogMessage'
import {
  REMOVE_SOCKET_EVENT_LISTENER,
  SET_SOCKET_EVENT_LISTENER,
} from '@/store/root/mutations.type'
import { CLEAR } from '@/store/session/mutations.type'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { Dialog } from '@/types/common'

type InvitationRequest = {
  inviter: string;
  room: string;
}

type MessageRequest = {
  messageList: string[];
  okLabel: string;
  closeLabel: string;
}

@Component
export default class PageChatBase extends Vue {
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

  get isInLobby() {
    return this.$route.name === RouteName.ChatRoomList
  }

  @Mutation(SET_SOCKET_EVENT_LISTENER)
  readonly setSocketEventListener!: (params: { event: string[]; callback: Function }) => void

  @Mutation(REMOVE_SOCKET_EVENT_LISTENER)
  readonly removeSocketEventListener!: (callback: Function) => void

  @Mutation(CLEAR)
  readonly clearSession!: () => void

  @Action(UPDATE_ROOM_LIST)
  readonly updateRoomList!: () => Promise<void>

  @Action(FETCH_ALL_PEOPLE)
  readonly fetchAllPeople!: () => Promise<string[]>

  @Action(SEND_INVITATION)
  readonly sendInvitation!: (params: { chatId: string; room: string}) => Promise<void>

  @WithGlobalSpinner
  async inviteeSelected(chatId: string) {
    const dialogProps = this.dialogProps[Dialog.INVITATION]
    this.closeDialog(Dialog.INVITATION)
    await this.sendInvitation({
      chatId,
      room: dialogProps.room,
    })
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

  openConfirmInvitationDialog({ chatId, room }: { chatId: string; room: string }) {
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

  openMessageDialog(args: { messageList: string[]; okLabel: string; closeLabel: string; disconnected: boolean }) {
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

  render() {
    return (
      <div class="chat-base">
        <router-view />
        {this.dialogProps[Dialog.INVITATION].visible &&
          <DialogInvitation
            people={this.dialogProps[Dialog.INVITATION].people}
            onOk={this.inviteeSelected}
            onClose={() => this.closeDialog(Dialog.INVITATION)}
          />
        }
        {this.dialogProps[Dialog.CONFIRM_INVITATION].visible &&
          <DialogConfirmInvitation
            inviter={this.dialogProps[Dialog.CONFIRM_INVITATION].inviter}
            room={this.dialogProps[Dialog.CONFIRM_INVITATION].room}
            onOk={this.invitationAccepted}
            onClose={this.invitationRejected}
          />
        }
        {this.dialogProps[Dialog.MESSAGE].visible &&
          <DialogMessage
            messageList={this.dialogProps[Dialog.MESSAGE].messageList}
            okLabel={this.dialogProps[Dialog.MESSAGE].okLabel}
            closeLabel={this.dialogProps[Dialog.MESSAGE].closeLabel}
            onOk={this.messageRead}
            onClose={this.messageClosed}
          />
        }
      </div>
    )
  }
}
