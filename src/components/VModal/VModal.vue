<template>
  <div class="dialog-background">
    <div class="dialog-window">
      <div class="dialog-body">
        <slot />
      </div>
      <div class="dialog-footer">
        <VButton
          v-if="closeLabel"
          variant="light"
          class="dialog-footer__close-button"
          @click="$emit('close')"
        >
          {{ closeLabel }}
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
import './VModal.scss'
import VButton from '@/components/VButton/VButton.vue'

@Component({
  components: { VButton },
})
export default class VDialog extends Vue {
  @Prop({ type: String, default: '확인' })
  readonly okLabel!: string

  @Prop({ type: String, default: '닫기' })
  readonly closeLabel!: string
}
</script>
