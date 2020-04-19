import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import MessageListItemUser from '@/components/MessageListItemUser/MessageListItemUser'
import MessageListItemSystem from '@/components/MessageListItemSystem/MessageListItemSystem'
import { Message, MessageType } from '@/services/socket'

interface MessageListItemDiscriminatorProps {
  message: Message;
  isMyMessage: boolean;
}

interface MessageListItemDiscriminatorEvents {
  onMessageLoaded(): void
}

@Component
export default class MessageListItemDiscriminator extends tsx.Component<MessageListItemDiscriminatorProps, MessageListItemDiscriminatorEvents> {
  @Prop({ type: Object, required: true })
  private readonly message!: Message

  @Prop(Boolean)
  private readonly isMyMessage!: boolean

  private get isSystemMessage() {
    return this.message.type === MessageType.System
  }

  render() {
    const Component = this.isSystemMessage ? MessageListItemSystem : MessageListItemUser
    return (
      <Component
        props={this.$props}
        on={this.$listeners}
      />
    )
  }
}
