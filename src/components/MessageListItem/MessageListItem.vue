import { MessageContentType } from '@/types'
<template>
  <li
    class="message-list-item"
    :class="`message-list-item-${isMyMessage ? 'me' : 'people'}`"
  >
    <div
      v-if="!isMyMessage"
      class="message-list-item-initial"
    >
      {{ senderInitial }}
    </div>
    <div
      class="message-list-item-text-box"
      :class="`message-list-item-text-box_align_${isMyMessage ? 'right' : 'left'}`"
    >
      <div
        v-if="!isMyMessage"
        class="message-list-item-sender"
      >
        {{ message.senderId }}
      </div>
      <div
        class="message-list-item-balloon"
        :class="`message-list-item-balloon_align_${isMyMessage ? 'right' : 'left'}`"
      >
        <div
          class="message-list-item-balloon__arrow"
          :class="`message-list-item-balloon__arrow_direction_${isMyMessage ? 'right' : 'left'}`"
        />
        <div
          class="message-list-item-balloon__content"
          :class="{ 'message-list-item-balloon__content_color_yellow': isMyMessage }"
        >
          <template v-if="isText">
            {{ message.content }}
          </template>
          <img
            v-else-if="isImage"
            class="message-list-item-balloon__content-image"
            :src="message.content"
            alt="image message"
            @load.once="contentLoaded"
            @error.once="contentLoaded"
          >
          <span
            class="message-list-item-balloon__datetime"
            :class="{ 'message-list-item-balloon__datetime_align_right': isMyMessage }"
          >{{ message.sentAt | datetime }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageListItem.scss'
import { Message, MessageContentType } from '@/types'
import dayjs from 'dayjs'

@Component({
  filters: {
    datetime(value: string) {
      return dayjs(value).format('LL A hh:mm:ss')
    },
  },
})
export default class MessageListItem extends Vue {
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
    this.$emit('message-loaded')
  }

  mounted() {
    if (this.isText) {
      this.contentLoaded()
    }
  }
}
</script>
