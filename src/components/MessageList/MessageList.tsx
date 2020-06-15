import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import './MessageList.scss'
import { Message } from '@/services/backend'

interface MessageListProps {
  messageList: Message[]
}

interface MessageListSlots {
  default: { message: Message };
}

@Component
export default class MessageList extends tsx.Component<MessageListProps, {}, MessageListSlots> {
  @Prop(Array)
  private readonly messageList!: Message[]

  render() {
    return (
      <ul class="message-list">
        {this.messageList.map(message => (
          <li
            key={message.id}
            class="message-list-item"
          >
            {this.$scopedSlots.default({ message })}
          </li>
        ))}
      </ul>
    )
  }
}
