<template>
  <div class="page">
    <h3 class="page__header">
      채팅방
    </h3>
    <ul class="page__content chat-rooms-list">
      <li
        v-for="{ name, id } in roomList"
        :key="id"
        class="chat-rooms-list__item"
      >
        <router-link
          v-slot="{ href, navigate }"
          :to="{
            name: RouteNames.ChatRoom,
            params: { id },
          }"
        >
          <a
            class="chat-rooms-list__item-content"
            :href="href"
            @click="navigate"
          >
            {{ name }}
            <VBadge>👨‍👩‍👧‍👦0</VBadge>
          </a>
        </router-link>
      </li>
    </ul>
    <VButton
      class="chat-rooms__btn_exit"
      variant="yellow"
      @click="exit"
    >
      나가기
    </VButton>
  </div>
</template>

<script lang="ts">
import './PageChatRoomList.scss'
import { Component, Vue } from 'vue-property-decorator'
import RouteNames from '@/router/route-names'
import VButton from '@/components/VButton/VButton.vue'
import VBadge from '@/components/VBadge/VBadge.vue'

@Component({
  components: { VBadge, VButton },
})
export default class TheChatRooms extends Vue {
  readonly RouteNames = RouteNames

  roomList = [
    { id: 1, name: 'room1' },
    { id: 2, name: 'room2' },
    { id: 3, name: 'room3' },
    { id: 4, name: 'room4' },
  ]

  exit() {
    this.$router.replace({ name: RouteNames.Main })
  }
}
</script>
