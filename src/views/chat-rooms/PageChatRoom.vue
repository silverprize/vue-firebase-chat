<template>
  <div class="page">
    <h3 class="page__header chat-room__header">
      <span class="chat-room__title">
        <VBadge class="chat-room__title-badge">👨‍👩‍👧‍👦{{ countUsers }}</VBadge>
        <span class="chat-room__title-text">{{ chatRoomName }}</span>
      </span>
      <VButton
        class="chat-room__exit-button"
        variant="yellow"
        @click="exit()"
      >
        나가기
      </VButton>
    </h3>
    <div class="page__content">
      <ul class="chat-room__list">
        <li
          v-for="(message, index) in messageList"
          :key="index"
          class="chat-room__list-item"
          :class="{
            'chat-room__list-item-me': message.senderId === me,
            'chat-room__list-item-people': message.senderId !== me
          }"
        >
          <div
            v-if="message.senderId !== me"
            class="initial"
          >
            {{ message.senderId }}
          </div>
          <div
            class="text-box"
            :class="`text-box_align_${message.senderId === me ? 'right' : 'left'}`"
          >
            <div
              v-if="message.senderId !== me"
              class="nickname"
            >
              123
            </div>
            <div
              class="balloon"
              :class="`balloon_align_${message.senderId === me ? 'right' : 'left'}`"
            >
              <div
                class="balloon__arrow"
                :class="`balloon__arrow_direction_${message.senderId === me ? 'right' : 'left'}`"
              />
              <div
                class="text"
                :class="{ 'text_yellow': message.senderId === me }"
              >
                {{ message.message }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-form">
      <div class="chat-form__menu">
        <label class="button">
          🖼
          <input
            type="file"
            accept="image/*"
            hidden
          >
        </label>
      </div>
      <div class="chat-form__input-area">
        <textarea class="chat-form__input" />
        <div class="chat-form__send-button-container">
          <button
            type="submit"
            class="chat-form__send-button button button_yellow"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './PageChatRoom.scss'
import { Component, Vue } from 'vue-property-decorator'
import RouteNames from '@/router/route-names'
import VBadge from '@/components/VBadge/VBadge.vue'
import VButton from '@/components/VButton/VButton.vue'

@Component({
  components: { VButton, VBadge },
})
export default class TheChatRoom extends Vue {
  chatRoomName: string = 'roomroomroomroomroomroomroomroomroomroomroomroomroomroomroom'
  countUsers = 3
  messageList = [
    {
      message: '11238201983. 129038029183. 12398210938092183092183 11238201983. 129038029183. 12398210938092183092183\n' +
        '          11238201983. 129038029183. 1239821093809218309218311238201983. 129038029183. 12398210938092183092183',
      senderId: 1,
      sentAt: Date.now(),
    },
    {
      message: '1',
      senderId: 2,
      sentAt: Date.now(),
    },
    {
      message: '2',
      senderId: 1,
      sentAt: Date.now(),
    },
    {
      message: '34567',
      senderId: 2,
      sentAt: Date.now(),
    },
  ]

  me = 1

  exit() {
    this.$router.replace({ name: RouteNames.ChatRoomList })
  }
}
</script>
