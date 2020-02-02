<template>
  <component
    :is="isSystemMessage ? MessageListItemSystem : MessageListItemUser"
    v-bind="$props"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Message, MessageType } from '@/types'
import MessageListItemUser from '@/components/MessageListItemUser/MessageListItemUser.vue'
import MessageListItemSystem from '@/components/MessageListItemSystem/MessageListItemSystem.vue'

@Component
export default class MessageListItemDiscriminator extends Vue {
  readonly MessageListItemSystem = MessageListItemSystem
  readonly MessageListItemUser = MessageListItemUser

  get isSystemMessage() {
    return this.message.type === MessageType.System
  }

  @Prop({ type: Object, required: true })
  readonly message!: Message

  @Prop(Boolean)
  readonly isMyMessage!: boolean
}
</script>
