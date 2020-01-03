<template>
  <div class="alert">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './VAlert.scss'

@Component
export default class VAlert extends Vue {}
</script>
