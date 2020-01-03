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
        >
      </div>
      <VButton
        type="submit"
        variant="brown"
        @click="connect"
      >
        접속
      </VButton>
    </form>
  </VPage>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { mixins } from 'vue-class-component'
import './PageMain.scss'
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

  @Ref()
  readonly idElement!: HTMLElement

  @Action(CONNECT)
  readonly connectToServer!: (id: string) => Promise<void>

  async connect() {
    if (!this.id.trim()) {
      this.message = '아이디를 입력하세요.'
      return
    }
    try {
      this.startSpinner()
      await this.connectToServer(this.id)
      this.stopSpinner()
      this.$router.push({
        name: RouteName.ChatRoomList,
      })
    } catch (e) {
      this.message = '접속이 안되고 있습니다.'
    }
  }

  mounted() {
    this.idElement.focus()
  }
}
</script>
