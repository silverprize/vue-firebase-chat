<template>
  <ChatFrame>
    <ChatFrameHeader class="chat-room__header">
      <div class="chat-room__title">
        <VBadge class="chat-room__title-badge">
          👨‍👩‍👧‍👦{{ countUsers }}
        </VBadge>
        <h4 class="chat-room__title-text">
          {{ chatRoomName }}
        </h4>
      </div>
      <VButton
        class="chat-room__leave-button"
        variant="yellow"
        @click="leave()"
      >
        나가기
      </VButton>
    </ChatFrameHeader>
    <ChatFrameBody ref="talkBoxScrollElement">
      <MessageList ref="messageListComponent">
        <MessageListItem
          v-for="(message) in messageList"
          :key="message.sentAt"
          :message="message"
          :is-my-message="message.senderId === me"
          @message-loaded="newMessageLoaded"
        />
      </MessageList>
    </ChatFrameBody>
    <ChatFrameInputPanel
      ref="inputPanel"
      @text-submitted="inputTextInformed"
    >
      <template v-slot:menu>
        <VFile
          class="chat-frame-input-panel__menu-item"
          accept="image/*"
          @files-selected="imageInformed"
        >
          사진 올리기
        </VFile>
        <VButton
          class="chat-frame-input-panel__menu-item"
          @click="openInviteDialog"
        >
          초대
        </VButton>
      </template>
    </ChatFrameInputPanel>
  </ChatFrame>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Route } from 'vue-router'
import { mixins } from 'vue-class-component'

import './PageChatRoom.scss'
import { GET_ID } from '@/store/session/getters.type'
import { GET_COUNT_PEOPLE, GET_MESSAGE_LIST, GET_ROOM_NAME } from '@/store/chat/getters.type'
import { Message, MessageContentType, MessageParams } from '@/types'
import RouteName from '@/router/route.name'
import VBadge from '@/components/VBadge/VBadge.vue'
import VButton from '@/components/VButton/VButton.vue'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import MessageList from '@/components/MessageList/MessageList.vue'
import MessageListItem from '@/components/MessageListItem/MessageListItem.vue'
import VFile from '@/components/VFile/VFile.vue'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader.vue'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody.vue'
import ChatFrameInputPanel from '@/components/ChatFrameInputPanel/ChatFrameInputPanel.vue'
import eventBus from '@/services/event-bus'
import { OPEN_INVITATION_DIALOG } from '@/services/event-bus/event-bus.event.name'
import { DISPATCH_MESSAGE, JOIN_ROOM, LEAVE_ROOM } from '@/store/chat/actions.type'

@Component({
  components: {
    ChatFrameInputPanel,
    ChatFrameBody,
    ChatFrameHeader,
    ChatFrame,
    MessageListItem,
    MessageList,
    VFile,
    VButton,
    VBadge,
  },
})
export default class PageChatRoom extends mixins(GlobalSpinnerHandler) {
  @Ref()
  readonly talkBoxScrollElement!: ChatFrameBody

  @Ref()
  readonly messageListComponent!: MessageList

  @Ref()
  readonly inputPanel!: ChatFrameInputPanel

  @Getter(GET_ID)
  readonly me!: string

  @Getter(GET_ROOM_NAME)
  readonly chatRoomName!: string

  @Getter(GET_COUNT_PEOPLE)
  readonly countUsers!: number

  @Getter(GET_MESSAGE_LIST)
  readonly messageList!: Message[]

  @Action(JOIN_ROOM)
  readonly joinRoom!: (roomName: string) => Promise<void>

  @Action(LEAVE_ROOM)
  readonly leaveRoom!: () => Promise<void>

  @Action(DISPATCH_MESSAGE)
  readonly dispatchMessage!: (message: MessageParams) => Promise<void>

  leave() {
    this.$router.replace({ name: RouteName.ChatRoomList })
  }

  openInviteDialog() {
    eventBus.send(OPEN_INVITATION_DIALOG)
  }

  newMessageLoaded() {
    this.talkBoxScrollElement.$el.scrollTop = this.messageListComponent.$el.clientHeight - this.talkBoxScrollElement.$el.clientHeight
  }

  inputTextInformed(text: string) {
    this.sendTextMessage({ content: text, contentType: MessageContentType.Text })
  }

  imageInformed(files: FileList) {
    this.sendTextMessage({ content: files, contentType: MessageContentType.Image })
  }

  async sendTextMessage({
    content,
    contentType,
  }: {
    content: string | FileList
    contentType: MessageContentType
  }) {
    this.dispatchMessage({
      content,
      contentType,
      senderId: this.me,
    })
  }

  mounted() {
    // @ts-ignore
    this.inputPanel.focusInput()
  }

  async beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(async (vm: PageChatRoom) => {
      vm.startSpinner()
      const roomName = to.params.room
      await vm.joinRoom(roomName)
      vm.stopSpinner()
    })
  }

  async beforeRouteLeave(to: Route, from: Route, next: () => void) {
    if (to.name !== RouteName.ChatRoom) {
      this.startSpinner()
      await this.leaveRoom()
      this.stopSpinner()
    }
    next()
  }
}
</script>
