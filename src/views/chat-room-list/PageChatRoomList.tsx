import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

import './PageChatRoomList.scss'
import { SIGN_OUT } from '@/store/session/actions.type'
import { GET_ROOMS } from '@/store/chat/getters.type'
import RouteName from '@/router/route.name'
import VButton from '@/components/VButton/VButton'
import VBadge from '@/components/VBadge/VBadge'
import ChatFrame from '@/components/ChatFrame/ChatFrame'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody'
import { RouteEnterNext, RouteNext, RouterLinkSlotProps } from '@/types/common'
import { Room } from '@/services/backend'
import { ENTER_LOBBY, LEAVE_LOBBY } from '@/store/chat/actions.type'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'

@Component
export default class PageChatRoomList extends Vue {
  @Getter(GET_ROOMS)
  private readonly rooms!: Room[]

  @Action(ENTER_LOBBY)
  readonly enterLobby!: () => Promise<void>

  @Action(LEAVE_LOBBY)
  readonly leaveLobby!: () => Promise<void>

  @WithGlobalSpinner
  @Action(SIGN_OUT)
  private readonly signOut!: () => Promise<void>

  private exit() {
    this.$router.replace({ name: RouteName.Main })
  }

  @WithGlobalSpinner
  async beforeRouteEnter(to: Route, from: Route, next: RouteEnterNext<PageChatRoomList>) {
    return new Promise(resolve => {
      next(async (vm) => {
        await vm.enterLobby()
        resolve()
      })
    })
  }

  // 채팅방 목록을 나가는 경우는 두가지, 접속 페이지로 이동과 채팅방 입장.
  // 접속 페이지로 이동할땐 인증해제.
  async beforeRouteLeave(to: Route, from: Route, next: RouteNext) {
    if (to.name === RouteName.Main) {
      await this.signOut()
    }
    this.leaveLobby()
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
            {this.rooms.map(({ id, name, countPeople }) => (
              <li
                key={id}
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
                    params: { roomId: id },
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
