import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'

import './DialogInvitation.scss'
import VModal from '@/components/VModal/VModal'
import { ChatUser } from '@/services/backend'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { InvitationDialog } from '@/store/dialog/types'

interface Props {
  params: InvitationDialog.Params;
}

interface Events {
  onOk(uid: string): void
  onClose(): void
}

@Component({
  components: { VModal },
})
export default class DialogInvitation extends tsx.Component<Props, Events> {
  @Prop(Object)
  private readonly params!: InvitationDialog.Params

  private users: ChatUser[] | null = null

  private guest: string = ''

  @WithGlobalSpinner
  private async onOk() {
    if (this.guest) {
      this.$emit('ok', this.guest)
    }
  }

  @WithGlobalSpinner
  async created() {
    const users = await this.params.usersPromise
    this.users = users || []
    if (this.users.length) {
      this.guest = this.users[0].id
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
            {this.users?.length &&
              this.users.map(chatUser => (
                <option
                  key={chatUser.id}
                  value={chatUser.id}
                  data-test="option"
                >
                  {chatUser.name}
                </option>
              ))
            }
            {this.users && !this.users.length &&
                <option
                  disabled
                  value=""
                >
                  초대할 사람이 없습니다.
                </option>
            }
          </select>
        </div>
      </VModal>
    )
  }
}
