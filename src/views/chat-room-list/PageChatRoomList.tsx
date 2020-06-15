import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

import './PageChatRoomList.scss'
import { DISCONNECT } from '@/store/session/actions.type'
import { GET_ROOM_LIST } from '@/store/chat/getters.type'
import { UPDATE_ROOM_LIST } from '@/store/chat/actions.type'
import RouteName from '@/router/route.name'
import VButton from '@/components/VButton/VButton'
import VBadge from '@/components/VBadge/VBadge'
import ChatFrame from '@/components/ChatFrame/ChatFrame'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody'
import { RouteNext, RouterLinkSlotProps } from '@/types/common'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { Room } from '@/store/chat/types'

@Component
export default class PageChatRoomList extends Vue {
  @Getter(GET_ROOM_LIST)
  private readonly roomList!: Room[]

  @Action(UPDATE_ROOM_LIST)
  private readonly updateRoomList!: () => Promise<void>

  @Action(DISCONNECT)
  private readonly disconnect!: () => Promise<void>

  private exit() {
    this.$router.replace({ name: RouteName.Main })
  }

  @WithGlobalSpinner
  async created() {
    await this.updateRoomList()
    // this.$firebase.database().ref().push()
  }

  // 채팅방 목록을 나가는 경우는 두가지, 접속 페이지로 이동과 채팅방 입장.
  // 접속 페이지로 이동할땐 연결해제.
  @WithGlobalSpinner
  async beforeRouteLeave(to: Route, from: Route, next: RouteNext) {
    if (to.name === RouteName.Main) {
      await this.disconnect()
    }
    next()
  }

  render() {
    return (
      <ChatFrame>
        <ChatFrameHeader>
          <h4 class="chat-room-list-header">
            채팅방
          </h4>
        </ChatFrameHeader>
        <ChatFrameBody>
          <ul class="chat-room-list-rooms">
            {this.roomList.map(({ name, countPeople }) => (
              <li
                key={name}
                class="chat-room-list-room"
              >
                <router-link
                  scopedSlots={{
                    default: ({ href, navigate }: RouterLinkSlotProps) => (
                      <a
                        class="chat-room-list-room__content"
                        href={href}
                        onClick={navigate}
                      >
                        {name}
                        <VBadge>👨‍👩‍👧‍👦 {countPeople}</VBadge>
                      </a>
                    ),
                  }}
                  to={{
                    name: RouteName.ChatRoom,
                    params: { room: name },
                  }}
                />
              </li>
            ))}
          </ul>
        </ChatFrameBody>
        <VButton
          variant="yellow"
          onClick={this.exit}
        >
          나가기
        </VButton>
      </ChatFrame>
    )
  }
}
