<template>
  <div class="chat-frame-header">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './ChatFrameHeader.scss'

@Component
export default class ChatFrameHeader extends Vue {}
</script>
