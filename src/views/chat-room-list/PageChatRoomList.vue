<template>
  <ChatFrame>
    <ChatFrameHeader>
      <h4 class="chat-rooms-header">
        채팅방
      </h4>
    </ChatFrameHeader>
    <ChatFrameBody>
      <ul class="chat-rooms-list">
        <li
          v-for="{ name, countPeople } in roomList"
          :key="name"
          class="chat-rooms-list__item"
        >
          <router-link
            v-slot="{ href, navigate }"
            :to="{
              name: RouteName.ChatRoom,
              params: { room: name },
            }"
          >
            <a
              class="chat-rooms-list__item-content"
              :href="href"
              @click="navigate"
            >
              {{ name }}
              <VBadge>👨‍👩‍👧‍👦{{ countPeople }}</VBadge>
            </a>
          </router-link>
        </li>
      </ul>
    </ChatFrameBody>
    <VButton
      class="chat-rooms__btn_exit"
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
import RouteName from '@/router/route.name'
import VButton from '@/components/VButton/VButton.vue'
import VBadge from '@/components/VBadge/VBadge.vue'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import ChatFrameHeader from '@/components/ChatFrameHeader/ChatFrameHeader.vue'
import ChatFrameBody from '@/components/ChatFrameBody/ChatFrameBody.vue'
import { FETCH_ROOM_LIST } from '@/store/chat/actions.type'

@Component<PageChatRooms>({
  components: { ChatFrameBody, ChatFrameHeader, ChatFrame, VBadge, VButton },
})
export default class PageChatRooms extends mixins(GlobalSpinnerHandler) {
  readonly RouteName = RouteName

  @Getter(GET_ROOM_LIST)
  readonly roomList!: []

  @Action(FETCH_ROOM_LIST)
  readonly fetchRoomList!: () => Promise<void>

  @Action(DISCONNECT)
  readonly disconnectFromServer!: () => Promise<void>

  exit() {
    this.$router.replace({ name: RouteName.Main })
  }

  async beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(async (vm: PageChatRooms) => {
      vm.startSpinner()
      await vm.fetchRoomList()
      vm.stopSpinner()
    })
  }

  async beforeRouteLeave(to: Route, from: Route, next: Function) {
    if (to.name !== RouteName.ChatRoom) {
      this.startSpinner()
      await this.disconnectFromServer()
      this.stopSpinner()
    }
    next()
  }
}
</script>
