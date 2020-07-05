import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import '@/scss/index.scss'
import { IS_BUSY } from '@/store/root/getters.type'
import VSpinner from '@/components/VSpinner/VSpinner'
import DialogContainer from '@/components/DialogContainer/DialogContainer'
import { CLEAR_DIALOGS, REQUEST_DIALOG } from '@/store/dialog/actions.type'
import { ConfirmInvitationDialog, DialogType, RequestDialog } from '@/store/dialog/types'
import { bus } from '@/services/bus'
import { ChatEvent } from '@/services/backend'
import RouteName from '@/router/route.name'

@Component
export default class App extends Vue {
  @Getter(IS_BUSY)
  readonly isBusy!: boolean

  @Action(REQUEST_DIALOG)
  readonly requestDialog!: RequestDialog

  @Action(CLEAR_DIALOGS)
  readonly clearDialogs!: () => Promise<void>

  created() {
    bus.on(this, ChatEvent.DISCONNECTED, () => {
      this.clearDialogs()
      this.requestDialog({
        dialogType: DialogType.MESSAGE,
        params: {
          message: '서버와 연결이 끊겼습니다.',
          closeText: '',
        },
      })
    })
    bus.on(this, ChatEvent.INVITATION_RECEIVED, (invitation: ConfirmInvitationDialog.Params) => {
      this.requestDialog({
        dialogType: DialogType.CONFIRM_INVITATION,
        params: {
          ...invitation,
          handleOk: () => {
            this.$router.push({
              name: RouteName.ChatRoom,
              params: { roomId: invitation.room.id },
            })
          },
        },
      })
    })
  }

  render() {
    return (
      <div id="app">
        <router-view />
        <DialogContainer />
        <div class="global-spinner" v-show={this.isBusy}>
          <VSpinner />
        </div>
      </div>
    )
  }
}
