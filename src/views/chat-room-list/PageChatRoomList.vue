<template>
  <ChatFrame>
    <ChatFrameHeader>
      <h4 class="chat-room-list-header">
        채팅방
      </h4>
    </ChatFrameHeader>
    <ChatFrameBody>
      <ul class="chat-room-list-rooms">
        <li
          v-for="{ name, countPeople } in roomList"
          :key="name"
          class="chat-room-list-room"
        >
          <router-link
            v-slot="{ href, navigate }"
            :to="{
              name: RouteName.ChatRoom,
              params: { room: name },
            }"
          >
            <a
              class="chat-room-list-room__content"
              :href="href"
              @click="navigate"
            >
              {{ name }}
              <VBadge>👨‍👩‍👧‍👦 {{ countPeople }}</VBadge>
            </a>
          </router-link>
        </li>
      </ul>
    </ChatFrameBody>
    <VButton
      variant="yellow"
      @click="exit"
    >
      나가기
    </VButton>
  </ChatFrame>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { mixins } from 'vue-class-component'

import './PageChatRoomList.scss'
import { DISCONNECT } from '@/store/session/actions.type'
import { GET_ROOM_LIST } from '@/store/chat/getters.type'
import { UPDATE_ROOM_LIST } from '@/store/chat/actions.type'
import RouteName from '@/router/route.name'
import VButton from '@/components/VButton/VButton.vue'
import VBadge from '@/components/VBadge/VBadge.vue'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader.vue'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody.vue'

@Component<PageChatRoomList>({
  components: { ChatFrameBody, ChatFrameHeader, ChatFrame, VBadge, VButton },
})
export default class PageChatRoomList extends mixins(GlobalSpinnerHandler) {
  readonly RouteName = RouteName

  @Getter(GET_ROOM_LIST)
  readonly roomList!: []

  @Action(UPDATE_ROOM_LIST)
  readonly updateRoomList!: () => Promise<void>

  @Action(DISCONNECT)
  readonly disconnect!: () => Promise<void>

  exit() {
    this.$router.replace({ name: RouteName.Main })
  }

  async beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(async (vm: PageChatRoomList) => {
      vm.startSpinner()
      await vm.updateRoomList()
      vm.stopSpinner()
    })
  }

  // 채팅방 목록을 나가는 경우는 두가지, 접속 페이지로 이동과 채팅방 입장.
  // 접속 페이지로 이동할땐 연결해제.
  async beforeRouteLeave(to: Route, from: Route, next: Function) {
    if (to.name === RouteName.Main) {
      this.startSpinner()
      await this.disconnect()
      this.stopSpinner()
    }
    next()
  }
}
</script>
