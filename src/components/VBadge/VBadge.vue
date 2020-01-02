<template functional>
  <span class="badge">
    <slot />
  </span>
</template>

<script lang="ts">
import './VBadge.scss'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VBadge extends Vue {}
</script>
