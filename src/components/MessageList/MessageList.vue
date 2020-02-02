<template>
  <ul class="message-list">
    <li
      v-for="message in messageList"
      :key="message.id"
      class="message-list-item"
    >
      <slot v-bind="{ message }" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageList.scss'
import { Message } from '@/types'

@Component
export default class MessageList extends Vue {
  @Prop(Array)
  readonly messageList!: Message[]
}
</script>
