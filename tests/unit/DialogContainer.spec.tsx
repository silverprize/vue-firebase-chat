import Vuex, { Store } from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import DialogContainer from '@/components/DialogContainer/DialogContainer'
import { rootModule } from '@/store/root'
import { REQUEST_DIALOG } from '@/store/dialog/actions.type'
import { DialogType } from '@/store/dialog/types'
import DialogMessage from '@/components/DialogMessage/DialogMessage'
import DialogInvitation from '@/components/DialogInvitation/DialogInvitation'
import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation'

const localVue = createLocalVue()
localVue.use(Vuex)

function mountDialogContainer() {
  return mount(DialogContainer, {
    store: new Store(rootModule),
  })
}

describe('DialogContainer.tsx', () => {
  it('메시지 다이얼로그.', async () => {
    const wrapper = mountDialogContainer()
    await wrapper.vm.$store.dispatch(REQUEST_DIALOG, {
      dialogType: DialogType.MESSAGE,
      params: {
        message: 'message message message message',
      },
    })
    expect(wrapper.findComponent(DialogMessage)).toBeTruthy()
  })

  it('초대 발송 다이얼로그', async () => {
    const wrapper = mountDialogContainer()
    await wrapper.vm.$store.dispatch(REQUEST_DIALOG, {
      dialogType: DialogType.INVITATION,
      params: {
        usersPromise: Promise.resolve([
          { id: 'a', name: 'a' },
        ]),
      },
    })
    expect(wrapper.findComponent(DialogInvitation)).toBeTruthy()
  })

  it('초대 수신 다이얼로그', async () => {
    const wrapper = mountDialogContainer()
    await wrapper.vm.$store.dispatch(REQUEST_DIALOG, {
      dialogType: DialogType.CONFIRM_INVITATION,
      params: {
        inviter: {},
        room: {},
      },
    })
    expect(wrapper.findComponent(DialogConfirmInvitation)).toBeTruthy()
  })
})
