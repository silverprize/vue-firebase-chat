<template>
  <VPage class="main">
    <img
      class="main__logo"
      src="../../assets/kakao.jpg"
      alt="Logo"
    >
    <VAlert
      v-if="message"
      class="main__message"
    >
      {{ message }}
    </VAlert>
    <form
      class="main__form"
      @submit.prevent=""
    >
      <div class="main__form-group">
        <label
          class="main__input-label"
          for="chatId"
        >
          아이디
        </label>
        <input
          id="chatId"
          ref="idElement"
          v-model="id"
          class="main__input"
          type="text"
          placeholder="홍길동"
          autocomplete="off"
        >
      </div>
      <VButton
        type="submit"
        variant="brown"
        :disabled="!validId"
        @click="connect"
      >
        접속
      </VButton>
    </form>
  </VPage>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import { Action, Mutation } from 'vuex-class'
import { mixins } from 'vue-class-component'
import './PageMain.scss'
import { NEW_SOCKET } from '@/store/mutations.type'
import { CONNECT } from '@/store/session/actions.type'
import RouteName from '@/router/route.name'
import VAlert from '@/components/VAlert/VAlert.vue'
import VSpinner from '@/components/VSpinner/VSpinner.vue'
import VButton from '@/components/VButton/VButton.vue'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import ChatFrame from '@/components/ChatFrame/ChatFrame.vue'
import VPage from '@/components/VPage/VPage.vue'

@Component({
  components: { VPage, ChatFrame, VButton, VSpinner, VAlert },
})
export default class PageMain extends mixins(GlobalSpinnerHandler) {
  id: string = ''
  message: string = ''

  get validId() {
    return this.id.trim()
  }

  @Ref()
  readonly idElement!: HTMLElement

  @Mutation(NEW_SOCKET)
  readonly newSocket!: () => void

  @Action(CONNECT)
  readonly connectToServer!: (id: string) => Promise<void>

  async connect() {
    this.startSpinner()
    try {
      await this.connectToServer(this.id)
      this.$router.push({
        name: RouteName.ChatRoomList,
      })
    } catch (e) {
      this.newSocket()
      this.message = e.message
    }
    this.stopSpinner()
  }

  mounted() {
    this.idElement.focus()
  }
}
</script>
