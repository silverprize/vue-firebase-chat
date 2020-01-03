<template>
  <div class="page">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './VPage.scss'

@Component
export default class VPage extends Vue {}
</script>
