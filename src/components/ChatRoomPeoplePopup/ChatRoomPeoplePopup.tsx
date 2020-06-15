import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import { ChatUser } from '@/services/backend'

import './ChatRoomPeoplePopup.scss'

interface Props {
  people: ChatUser[];
}

@Component
export default class ChatRoomPeoplePopup extends tsx.Component<Props> {
  @Prop(Array)
  private readonly people!: ChatUser[]

  render() {
    return (
      <div staticClass="chat-room-popup">
        <span staticClass="chat-room-popup__arrow" />
        <ul staticClass="chat-room-popup__body">
          {this.people.map(user => (
            <li staticClass="chat-room-popup__user-name">
              🗣 {user.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
