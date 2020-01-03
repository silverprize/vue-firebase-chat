<template>
  <div class="chat-frame-body">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './ChatFrameBody.scss'

@Component
export default class ChatFrameBody extends Vue {}
</script>
