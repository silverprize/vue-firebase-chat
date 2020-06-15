import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import MessageListItemUser from '@/components/MessageListItemUser/MessageListItemUser'
import MessageListItemSystem from '@/components/MessageListItemSystem/MessageListItemSystem'
import { Message } from '@/services/backend'

interface MessageListItemDiscriminatorProps {
  message: Message;
  isMyMessage: boolean;
}

interface MessageListItemDiscriminatorEvents {
  onMessageLoaded(message: Message): void
}

@Component
export default class MessageListItemDiscriminator extends tsx.Component<MessageListItemDiscriminatorProps, MessageListItemDiscriminatorEvents> {
  @Prop({ type: Object, required: true })
  private readonly message!: Message

  @Prop(Boolean)
  private readonly isMyMessage!: boolean

  private get isSystemMessage() {
    return this.message.type === Message.Type.System
  }

  render() {
    const Component = this.isSystemMessage ? MessageListItemSystem : MessageListItemUser
    return (
      <Component
        props={{
          message: this.message,
          isMyMessage: this.isMyMessage,
        }}
        on={this.$listeners}
      />
    )
  }
}
