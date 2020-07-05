import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Route } from 'vue-router'

import './PageChatRoom.scss'
import { GET_MESSAGES, GET_PEOPLE, GET_ROOM_INFO } from '@/store/chat/getters.type'
import RouteName from '@/router/route.name'
import VBadge from '@/components/VBadge/VBadge'
import VButton from '@/components/VButton/VButton'
import MessageList from '@/components/MessageList/MessageList'
import MessageListItemDiscriminator
  from '@/components/MessageListItemDiscriminator/MessageListItemDiscriminator'
import VFile from '@/components/VFile/VFile'
import ChatFrame from '@/components/ChatFrame/ChatFrame'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody'
import ChatFrameInputPanel from '@/components/ChatFrameInputPanel/ChatFrameInputPanel'
import {
  DISPATCH_MESSAGE,
  ENTER_ROOM,
  LEAVE_ROOM,
  SEND_INVITATION,
} from '@/store/chat/actions.type'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { RouteEnterNext, RouteNext } from '@/types/common'
import { GET_PROFILE } from '@/store/session/getters.type'
import { ChatUser, Message, Profile, Room } from '@/services/backend'
import { DialogType, RequestDialog } from '@/store/dialog/types'
import ChatRoomPeoplePopup from '@/components/ChatRoomPeoplePopup/ChatRoomPeoplePopup'
import { REQUEST_DIALOG } from '@/store/dialog/actions.type'
import { DispatchMessage, EnterRoom, LeaveRoom, SendInvitation } from '@/store/chat/types'

@Component
export default class PageChatRoom extends Vue {
  @Ref()
  readonly chatFrameBody!: ChatFrameBody

  @Ref()
  readonly messageList!: MessageList

  @Ref()
  readonly inputPanel!: ChatFrameInputPanel

  @Getter(GET_PROFILE)
  readonly profile!: Profile

  @Getter(GET_ROOM_INFO)
  readonly room!: Room

  @Getter(GET_PEOPLE)
  readonly people!: ChatUser[]

  @Getter(GET_MESSAGES)
  readonly messages!: Message[]

  @Action(ENTER_ROOM)
  readonly enterRoom!: EnterRoom

  @Action(LEAVE_ROOM)
  readonly leaveRoom!: LeaveRoom

  @Action(DISPATCH_MESSAGE)
  readonly dispatchMessage!: DispatchMessage

  @Action(SEND_INVITATION)
  readonly sendInvitation!: SendInvitation

  @Action(REQUEST_DIALOG)
  readonly requestDialog!: RequestDialog

  sendMessageQueue: Promise<void> = Promise.resolve()

  isScrollAtEnd = true

  peoplePopupShowed = false

  handleLeaveClick() {
    this.$router.replace({ name: RouteName.ChatRoomList })
  }

  handleInvitationMenuClick() {
    this.requestDialog({
      dialogType: DialogType.INVITATION,
      params: {
        handleOk: this.handleSendInvitationOk,
      },
    })
  }

  @WithGlobalSpinner
  handleSendInvitationOk(uid: string) {
    return this.sendInvitation(uid)
  }

  handleNewMessageLoaded(message: Message) {
    const isMyMessage = message.sender.id === this.profile.uid
    if (isMyMessage || this.isScrollAtEnd) {
      this.chatFrameBody.$el.scrollTop = this.messageList.$el.clientHeight - this.chatFrameBody.$el.clientHeight
    }
  }

  handleTextSubmitted(text: string) {
    this.sendMessage({ content: text, contentType: Message.ContentType.Text })
  }

  handleImageSubmitted(files: File[], focusTextarea: () => void) {
    this.sendMessage({ content: files, contentType: Message.ContentType.Image })
    focusTextarea()
  }

  sendMessage({
    content,
    contentType,
  }: {
    content: string | File[];
    contentType: Message.ContentType;
  }) {
    this.sendMessageQueue = this.sendMessageQueue.then(() => this.dispatchMessage({
      content,
      contentType,
    }))
  }

  handleChatFrameBodyScroll() {
    const scrollElement = this.chatFrameBody.$el
    const messageElement = this.messageList.$el
    this.isScrollAtEnd = Math.abs((scrollElement.scrollTop + scrollElement.clientHeight) - messageElement.clientHeight) < 2
  }

  handlePeopleNumberClick() {
    this.peoplePopupShowed = !this.peoplePopupShowed
  }

  @Watch('room')
  async watchRoom(newRoom: Room) {
    if (newRoom.id) {
      await this.$nextTick()
      this.inputPanel.focusInput()
    }
  }

  @WithGlobalSpinner
  beforeRouteEnter(to: Route, from: Route, next: RouteEnterNext<PageChatRoom>) {
    return new Promise(resolve => {
      next(async (vm) => {
        try {
          await vm.enterRoom(to.params.roomId)
        } catch (e) {
          vm.requestDialog({
            dialogType: DialogType.MESSAGE,
            params: {
              message: '🚧 채팅방 연결중 오류가 발생했습니다.',
              closeText: '',
              okText: '채팅방 목록으로 이동',
              handleOk: () => {
                vm.$router.replace({ name: RouteName.ChatRoomList })
              },
            },
          })
        }
        resolve()
      })
    })
  }

  @WithGlobalSpinner
  async beforeRouteUpdate(to: Route, from: Route, next: RouteNext) {
    // 다른 채팅방으로 이동
    try {
      await this.leaveRoom()
      await this.enterRoom(to.params.roomId)
      next()
    } catch {
      this.requestDialog({
        dialogType: DialogType.MESSAGE,
        params: {
          message: '🚧 채팅방 연결중 오류가 발생했습니다.',
          closeText: '',
          okText: '닫기',
        },
      })
    }
  }

  async beforeRouteLeave(to: Route, from: Route, next: RouteNext) {
    // 채팅방 목록으로 이동
    this.leaveRoom()
    next()
  }

  render() {
    return (
      <ChatFrame>
        <ChatFrameHeader class="chat-room__header">
          <div class="chat-room__title">
            <div>
              <VButton onClick={this.handlePeopleNumberClick}>
                <VBadge class="chat-room__title-badge">
                  💬 {this.people.length}
                </VBadge>
              </VButton>
              {this.peoplePopupShowed && <ChatRoomPeoplePopup people={this.people} />}
            </div>
            <h4 class="chat-room__title-text">
              {this.room.name}
            </h4>
          </div>
          <VButton
            class="chat-room__leave-button"
            variant="yellow"
            onClick={this.handleLeaveClick}
          >
            나가기
          </VButton>
        </ChatFrameHeader>
        <ChatFrameBody ref="chatFrameBody" nativeOnScroll={this.handleChatFrameBodyScroll}>
          <MessageList
            ref="messageList"
            messageList={this.messages}
            scopedSlots={{
              default: ({ message }: { message: Message }) => (
                <MessageListItemDiscriminator
                  key={message.id}
                  message={message}
                  isMyMessage={message.sender.id === this.profile.uid}
                  onMessageLoaded={this.handleNewMessageLoaded}
                />
              ),
            }}
          />
        </ChatFrameBody>
        <ChatFrameInputPanel
          ref="inputPanel"
          onTextSubmitted={this.handleTextSubmitted}
          disabled={!this.room.id}
          scopedSlots={{
            menus: ({ focusInput, disabled }: { focusInput: () => void, disabled: boolean }) => (
              [
                <VFile
                  class="chat-frame-input-panel__menu-item"
                  accept="image/*"
                  disabled={disabled}
                  onSelectFile={$event => this.handleImageSubmitted($event, focusInput)}
                >
                  사진 올리기
                </VFile>,
                <VButton
                  class="chat-frame-input-panel__menu-item"
                  disabled={disabled}
                  onClick={this.handleInvitationMenuClick}
                >
                  초대
                </VButton>,
              ]
            ),
          }}
        >
        </ChatFrameInputPanel>
      </ChatFrame>
    )
  }
}
