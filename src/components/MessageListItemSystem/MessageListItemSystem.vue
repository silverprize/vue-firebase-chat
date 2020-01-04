<template>
  <div class="message-list-item-system">
    {{ message.content }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageListItemSystem.scss'
import { Message } from '@/types'

@Component
export default class MessageListItemSystem extends Vue {
  @Prop({ type: Object, required: true })
  readonly message!: Message
}
</script>
