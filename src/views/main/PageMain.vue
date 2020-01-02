<template>
  <div class="page main">
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
          class="input-text-label"
          for="chatId"
        >
          아이디
        </label>
        <input
          id="chatId"
          v-model="id"
          class="input-text"
          type="text"
          placeholder="홍길동"
          autofocus
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
  </div>
</template>

<script lang="ts">
import './PageMain.scss'
import { Component, Vue } from 'vue-property-decorator'
import RouteNames from '@/router/route-names'
import VAlert from '@/components/VAlert/VAlert.vue'
import VSpinner from '@/components/VSpinner/VSpinner.vue'
import VButton from '@/components/VButton/VButton.vue'

@Component({
  components: { VButton, VSpinner, VAlert },
})
export default class TheMain extends Vue {
  id: string = ''
  message: string = ''

  connect() {
    if (!this.id.trim()) {
      this.message = '아이디를 입력하세요.'
      return
    }
    this.$router.push({
      name: RouteNames.ChatRoomList,
    })
  }
}
</script>
