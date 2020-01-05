<template>
  <div
    class="message-list-item-user"
    :class="{ 'message-list-item-user-me': isMyMessage }"
  >
    <div
      v-if="!isMyMessage"
      class="message-list-item-user-initial"
    >
      {{ senderInitial }}
    </div>
    <div
      class="message-list-item-user-text-box"
      :class="`message-list-item-user-text-box_align_${isMyMessage ? 'right' : 'left'}`"
    >
      <div
        v-if="!isMyMessage"
        class="message-list-item-user-sender"
      >
        {{ message.senderId }}
      </div>
      <div
        class="message-list-item-user-balloon"
        :class="`message-list-item-user-balloon_align_${isMyMessage ? 'right' : 'left'}`"
      >
        <div
          class="message-list-item-user-balloon__arrow"
          :class="`message-list-item-user-balloon__arrow_direction_${isMyMessage ? 'right' : 'left'}`"
        />
        <div
          class="message-list-item-user-balloon__content"
          :class="{ 'message-list-item-user-balloon__content_color_yellow': isMyMessage }"
        >
          <pre
            v-if="isText"
            class="message-list-item-user-balloon__content-text"
          >{{ message.content }}</pre>
          <div
            v-else-if="isImage"
            class="message-list-item-user-balloon__content-image-wrapper"
          >
            <img
              class="message-list-item-user-balloon__content-image"
              :src="message.content"
              alt=""
              @load.once="contentLoaded"
              @error.once="contentLoaded"
            >
            <div
              v-if="!isContentLoaded"
              class="absolute spinner"
              :class="{ 'spinner_color_light': isMyMessage }"
            />
          </div>
          <span
            class="message-list-item-user-balloon__datetime"
            :class="{ 'message-list-item-user-balloon__datetime_align_right': isMyMessage }"
          >{{ message.sentAt | datetime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageListItemUser.scss'
import { Message, MessageContentType } from '@/types'

@Component
export default class MessageListItemUser extends Vue {
  isContentLoaded = false

  get senderInitial() {
    return this.message.senderId[0]
  }

  get isText() {
    return this.message.contentType === MessageContentType.Text
  }

  get isImage() {
    return this.message.contentType === MessageContentType.Image
  }

  @Prop({ type: Object, required: true })
  readonly message!: Message

  @Prop(Boolean)
  readonly isMyMessage!: boolean

  contentLoaded() {
    this.isContentLoaded = true
    this.$emit('message-loaded')
  }

  mounted() {
    if (this.isText) {
      this.contentLoaded()
    }
  }
}
</script>
