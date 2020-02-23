import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import './DialogInvitation.scss'
import VModal from '@/components/VModal/VModal'

interface DialogInvitationProps {
  people?: string[]
}

interface DialogInvitationEvents {
  onOk(chatId: string): void
  onClose(): void
}

@Component({
  components: { VModal },
})
export default class DialogInvitation extends tsx.Component<DialogInvitationProps, DialogInvitationEvents> {
  @Prop({ type: Array, default: () => ([]) })
  private readonly people!: string[]

  private guest = ''

  private onOk() {
    if (this.guest) {
      this.$emit('ok', this.guest)
    }
  }

  created() {
    if (this.people.length) {
      this.guest = this.people[0]
    }
  }

  render() {
    return (
      <VModal
        okLabel="초대"
        onOk={this.onOk}
        onClose={() => this.$emit('close')}
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
            v-model={this.guest}
            value={this.guest}
            class="dialog-select-user"
          >
            {this.people.length > 0
              ? (
                this.people.map(chatId => (
                  <option
                    key={chatId}
                    value={chatId}
                  >
                    {chatId}
                  </option>
                ))
              )
              : (
                <option
                  disabled
                  value=""
                >
                  초대할 사람이 없습니다.
                </option>
              )
            }
          </select>
        </div>
      </VModal>
    )
  }
}
