<template>
  <span class="badge">
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './VBadge.scss'

@Component
export default class VBadge extends Vue {}
</script>
