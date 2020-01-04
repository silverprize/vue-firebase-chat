<template>
  <VDialog
    :ok-label="okLabel"
    :close-label="closeLabel"
    v-on="$listeners"
  >
    <div class="dialog-content">
      <div
        v-for="(message, index) in messageList"
        :key="index"
        class="dialog-content-message"
      >
        {{ message }}
      </div>
    </div>
  </VDialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VDialog from '@/components/VDialog/VDialog.vue'

@Component({
  components: { VDialog },
})
export default class DialogMessage extends Vue {
  @Prop(Array)
  readonly messageList!: string[]

  @Prop(String)
  readonly okLabel!: string

  @Prop(String)
  readonly closeLabel!: string
}
</script>
