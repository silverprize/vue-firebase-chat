<template functional>
  <div
    class="alert"
    :class="data.staticClass"
  >
    {{ props.message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: true,
})
export default class Alert extends Vue {
  @Prop({ type: String, required: true })
  message!: string
}
</script>

<style lang="scss">
.alert {
  border-radius: $default-border-radius;
  border: 1px solid $yellow-border-color;
  background-color: $yellow-color;
  padding: $half-spacer;
  @include box-shadow()
}
</style>
