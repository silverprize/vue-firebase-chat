<template>
  <ul class="message-list">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './MessageList.scss'

@Component
export default class MessageList extends Vue {}
</script>
