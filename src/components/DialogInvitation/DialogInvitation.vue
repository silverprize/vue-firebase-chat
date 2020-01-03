<template>
  <VDialog
    ok-label="초대"
    @ok="ok"
    @close="$emit('close')"
  >
    <div class="dialog-content">
      <label
        class="dialog-select-user-label"
        for="user"
      >
        초대할 사람을 선택하세요.
      </label>
      <select
        id="user"
        v-model="guest"
        class="dialog-select-user"
      >
        <option>1234</option>
      </select>
    </div>
  </VDialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './DialogInvitation.scss'
import VDialog from '@/components/VDialog/VDialog.vue'

@Component({
  components: { VDialog },
})
export default class DialogInvitation extends Vue {
  guest = '1234'

  ok() {
    this.$emit('ok', this.guest)
  }
}
</script>
