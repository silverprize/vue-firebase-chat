<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  @Prop(String)
  message!: string
}
</script>
