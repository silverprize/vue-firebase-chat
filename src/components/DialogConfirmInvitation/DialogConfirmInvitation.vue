<template>
  <VDialog
    ok-label="수락"
    v-on="$listeners"
  >
    <div class="dialog-content">
      <div>
        <strong>{{ inviter }}</strong> 님이,
      </div>
      <div>
        <strong>{{ room }}</strong> 방으로 초대했습니다.
      </div>
    </div>
  </VDialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './DialogConfirmInvitation.scss'
import VDialog from '@/components/VDialog/VDialog.vue'

@Component({
  components: { VDialog },
})
export default class DialogConfirmInvitation extends Vue {
  @Prop({ type: String, required: true })
  readonly inviter!: string

  @Prop({ type: String, required: true })
  readonly room!: string
}
</script>
