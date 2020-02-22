<template>
  <VModal
    ok-label="수락"
    v-on="$listeners"
  >
    <div class="dialog-content">
      <div class="dialog-content-message">
        <strong>{{ inviter }}</strong> 님이,
      </div>
      <div class="dialog-content-message">
        <strong>{{ room }}</strong> 방으로 초대했습니다.
      </div>
    </div>
  </VModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VModal from '@/components/VModal/VModal'

@Component({
  components: { VModal },
})
export default class DialogConfirmInvitation extends Vue {
  @Prop({ type: String, required: true })
  readonly inviter!: string

  @Prop({ type: String, required: true })
  readonly room!: string
}
</script>
