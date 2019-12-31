<template>
  <div class="alert">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Alert extends Vue {
  @Prop({ type: String, required: true })
  message!: string
}
</script>

<style lang="scss" scoped>

</style>
