import { MessageContentType } from '@/types'
<template>
  <li class="message-list-item">
    <MessageListItemSystem
      v-if="isSystemMessage"
      v-bind="$props"
      v-on="$listeners"
    />
    <MessageListItemUser
      v-else
      v-bind="$props"
      v-on="$listeners"
    />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageListItem.scss'
import { Message, MessageType } from '@/types'
import MessageListItemUser from '@/components/MessageListItemUser/MessageListItemUser.vue'
import MessageListItemSystem from '@/components/MessageListItemSystem/MessageListItemSystem.vue'

@Component({
  components: { MessageListItemSystem, MessageListItemUser },
})
export default class MessageListItem extends Vue {
  get isSystemMessage() {
    return this.message.type === MessageType.System
  }

  @Prop({ type: Object, required: true })
  readonly message!: Message

  @Prop(Boolean)
  readonly isMyMessage!: boolean
}
</script>
