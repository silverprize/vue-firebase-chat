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
            <span class="badge">👨‍👩‍👧‍👦0</span>
          </a>
        </router-link>
      </li>
    </ul>
    <button
      class="chat-rooms__btn_exit button button_yellow"
      type="button"
      @click="exit"
    >
      나가기
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouteNames from '@/router/route-names'

@Component
export default class ChatRooms extends Vue {
  readonly RouteNames = RouteNames

  roomList = [
    { id: 1, name: 'room1' },
    { id: 2, name: 'room2' },
    { id: 3, name: 'room3' },
    { id: 4, name: 'room4' },
  ]

  exit() {
    this.$router.replace({ name: RouteNames.Home })
  }
}
</script>

<style lang="scss">
.chat-rooms {
  &-list {
    list-style: none;
    margin: 0;

    &__item {
      &:not(last-child) {
        margin-bottom: $spacer / 4;
      }

      &-content {
        border: 1px solid lighten($default-border-color, 20%);
        border-radius: $default-border-radius;
        background-color: $light-color;
        align-items: center;
        justify-content: space-between;
        display: flex;
        font-size: 1.2rem;
        padding: $spacer;
        cursor: pointer;
        @include hover(null, $grey-color);
        @include box-shadow();
      }
    }
  }
}
</style>
