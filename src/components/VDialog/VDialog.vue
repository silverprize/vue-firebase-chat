<template>
  <div class="dialog-background">
    <div class="dialog-window">
      <div class="dialog-body">
        <slot />
      </div>
      <div class="dialog-footer">
        <VButton
          variant="light"
          class="dialog-footer__close-button"
          @click="$emit('close')"
        >
          닫기
        </VButton>
        <VButton
          variant="yellow"
          @click="$emit('ok')"
        >
          {{ okLabel }}
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './VDialog.scss'
import VButton from '@/components/VButton/VButton.vue'

@Component({
  components: { VButton },
})
export default class VDialog extends Vue {
  @Prop({ type: String, default: '확인' })
  readonly okLabel!: string
}
</script>
