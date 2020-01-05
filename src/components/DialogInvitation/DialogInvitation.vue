<template>
  <VModal
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
        :value="guest"
        class="dialog-select-user"
      >
        <template v-if="people.length">
          <option
            v-for="chatId in people"
            :key="chatId"
            :value="chatId"
          >
            {{ chatId }}
          </option>
        </template>
        <option
          v-else
          disabled
          value=""
        >
          초대할 사람이 없습니다.
        </option>
      </select>
    </div>
  </VModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './DialogInvitation.scss'
import VModal from '@/components/VModal/VModal.vue'

@Component({
  components: { VModal },
})
export default class DialogInvitation extends Vue {
  guest = ''

  @Prop({ type: Array, default: () => ([]) })
  readonly people!: string[]

  ok() {
    if (this.guest) {
      this.$emit('ok', this.guest)
    }
  }

  created() {
    if (this.people.length) {
      this.guest = this.people[0]
    }
  }
}
</script>
