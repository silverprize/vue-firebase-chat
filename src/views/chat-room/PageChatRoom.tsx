import { Component, Ref, Vue } from 'vue-property-decorator'
import { Action, Getter, Mutation } from 'vuex-class'
import { Route } from 'vue-router'

import './PageChatRoom.scss'
import { GET_ID } from '@/store/session/getters.type'
import { GET_COUNT_PEOPLE, GET_MESSAGE_LIST, GET_ROOM_NAME } from '@/store/chat/getters.type'
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
import eventBus from '@/services/eventBus'
import { OPEN_INVITATION_DIALOG } from '@/services/eventBus/event.name'
import {
  DISPATCH_MESSAGE,
  JOIN_ROOM,
  LEAVE_ROOM,
  UPDATE_ROOM_INFO,
} from '@/store/chat/actions.type'
import { ADD_MESSAGE, SET_IMAGE_URL } from '@/store/chat/mutations.type'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { Message, MessageContentType, MessageParams } from '@/store/chat/types'
import { RouteEnterNext, RouteNext } from '@/types/common'

@Component
export default class PageChatRoom extends Vue {
  @Ref()
  readonly talkBoxScrollElement!: ChatFrameBody

  @Ref()
  readonly messageListComponent!: MessageList

  @Ref()
  readonly inputPanel!: ChatFrameInputPanel

  @Getter(GET_ID)
  readonly me!: string

  @Getter(GET_ROOM_NAME)
  readonly roomName!: string

  @Getter(GET_COUNT_PEOPLE)
  readonly countUsers!: number

  @Getter(GET_MESSAGE_LIST)
  readonly messageList!: Message[]

  @Mutation(ADD_MESSAGE)
  readonly addNewMessage!: (message: Message) => void

  @Mutation(SET_IMAGE_URL)
  readonly updateMessageImage!: (message: Message) => void

  @Action(JOIN_ROOM)
  readonly dispatchJoin!: (roomName: string) => Promise<void>

  @Action(LEAVE_ROOM)
  readonly dispatchLeave!: () => Promise<void>

  @Action(DISPATCH_MESSAGE)
  readonly dispatchMessage!: (message: MessageParams) => Promise<void>

  @Action(UPDATE_ROOM_INFO)
  readonly updateRoomInfo!: (room: string) => Promise<void>

  leave() {
    this.$router.replace({ name: RouteName.ChatRoomList })
  }

  openInvitationDialog() {
    eventBus.send(OPEN_INVITATION_DIALOG, this.roomName)
  }

  newMessageLoaded() {
    this.talkBoxScrollElement.$el.scrollTop = this.messageListComponent.$el.clientHeight - this.talkBoxScrollElement.$el.clientHeight
  }

  inputTextInformed(text: string) {
    this.sendTextMessage({ content: text, contentType: MessageContentType.Text })
  }

  imageInformed(files: File[], focusTextarea: () => void) {
    this.sendTextMessage({ content: files, contentType: MessageContentType.Image })
    focusTextarea()
  }

  async sendTextMessage({
    content,
    contentType,
  }: {
    content: string | File[];
    contentType: MessageContentType;
  }) {
    this.dispatchMessage({
      content,
      contentType,
      senderId: this.me,
    })
  }

  @WithGlobalSpinner
  async joinRoom(room: string) {
    await this.dispatchJoin(room)
  }

  @WithGlobalSpinner
  async leaveRoom() {
    await this.dispatchLeave()
  }

  mounted() {
    // @ts-ignore
    this.inputPanel.focusInput()
  }

  async beforeRouteEnter(to: Route, from: Route, next: RouteEnterNext<PageChatRoom>) {
    next((vm) => vm.joinRoom(to.params.room))
  }

  async beforeRouteUpdate(to: Route, from: Route, next: RouteNext) {
    await this.joinRoom(to.params.room)
    next()
  }

  async beforeRouteLeave(to: Route, from: Route, next: RouteNext) {
    if (to.name !== RouteName.ChatRoom) {
      await this.leaveRoom()
    }
    next()
  }

  render() {
    return (
      <ChatFrame>
        <ChatFrameHeader class="chat-room__header">
          <div class="chat-room__title">
            <VBadge class="chat-room__title-badge">
              👨‍👩‍👧‍👦 {this.countUsers}
            </VBadge>
            <h4 class="chat-room__title-text">
              {this.roomName}
            </h4>
          </div>
          <VButton
            class="chat-room__leave-button"
            variant="yellow"
            onClick={this.leave}
          >
            나가기
          </VButton>
        </ChatFrameHeader>
        <ChatFrameBody ref="talkBoxScrollElement">
          <MessageList
            ref="messageListComponent"
            messageList={this.messageList}
            scopedSlots={{
              default: ({ message }: { message: Message }) => (
                <MessageListItemDiscriminator
                  key={message.sequence}
                  message={message}
                  isMyMessage={message.senderId === this.me}
                  onMessageLoaded={this.newMessageLoaded}
                />
              ),
            }}
          />
        </ChatFrameBody>
        <ChatFrameInputPanel
          ref="inputPanel"
          onTextSubmitted={this.inputTextInformed}
          scopedSlots={{
            menu: ({ focusInput }: { focusInput: () => void }) => (
              [
                <VFile
                  class="chat-frame-input-panel__menu-item"
                  accept="image/*"
                  onSelectFile={$event => this.imageInformed($event, focusInput)}
                >
                  사진 올리기
                </VFile>,
                <VButton
                  class="chat-frame-input-panel__menu-item"
                  onClick={this.openInvitationDialog}
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
