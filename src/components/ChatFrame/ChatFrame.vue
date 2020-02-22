<template>
  <VPage>
    <slot />
  </VPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './ChatFrame.scss'
import VPage from '@/components/VPage/VPage'

@Component({
  components: { VPage },
})
export default class ChatFrame extends Vue {
}
</script>
