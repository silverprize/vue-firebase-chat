<template>
  <div class="page home">
    <img
      class="logo"
      src="../assets/kakao.jpg"
    >
    <alert
      v-if="message"
      :message="message"
      class="home__message"
    />
    <form
      class="form"
      @submit.prevent=""
    >
      <div class="form__chat-id">
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
      <button
        class="button button_brown"
        type="submit"
        @click="connect"
      >
        접속
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Alert from '@/components/Alert.vue'
import RouteNames from '@/router/route-names'
import Spinner from '@/components/Spinner.vue'

@Component({
  components: { Spinner, Alert },
})
export default class Home extends Vue {
  id: string = ''
  message: string = ''

  connect () {
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

<style lang="scss">
.home {
  align-items: center;
  justify-content: center;
  position: relative;

  &__message {
    position: absolute;
    margin-top: 0.75rem;
  }
}
.form {
  @include flex(column);
  margin-top: $spacer * 2;

  &__chat-id {
    margin-bottom: $half-spacer;
  }
}
.logo {
  border-radius: $default-border-radius;
  margin-bottom: $spacer * 3;
  width: 140px;
  height: 140px;
}
</style>
