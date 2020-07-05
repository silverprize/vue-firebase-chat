import { createLocalVue, mount, ThisTypedMountOptions } from '@vue/test-utils'
import PageChatRoom from '@/views/chat-room/PageChatRoom'
import Vuex from 'vuex'
import { rootModule } from '@/store/root'
import { Message } from '@/services/backend'
import RouteName from '@/router/route.name'
import { DialogType } from '@/store/dialog/types'

const mountPageChatRoom = ({
  methods = {},
  computed = {},
}: ThisTypedMountOptions<PageChatRoom> = {}) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const mock = PageChatRoom.extend({
    methods,
  })
  return mount<PageChatRoom>(mock, {
    localVue,
    store: new Vuex.Store(rootModule),
    computed,
  })
}

describe('PageChatRoom', () => {
  it('채팅방 입장.', async () => {
    const roomId = 'chatRoom'
    const enterRoom = jest.fn()
    const wrapper = mountPageChatRoom({
      methods: {
        enterRoom,
      },
    })

    await wrapper.vm.beforeRouteEnter(
      { params: { roomId } } as any,
      null as never,
      (callback: Function) => callback(wrapper.vm),
    )

    expect(enterRoom).toHaveBeenCalledWith(roomId)
  })

  it('채팅방 나감.', async () => {
    const leaveRoom = jest.fn()
    const wrapper = mountPageChatRoom({
      methods: {
        leaveRoom,
      },
    })

    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.ChatRoomList } as any,
      null as never,
      () => {},
    )

    expect(leaveRoom).toHaveBeenCalled()
  })

  it('메시지 발송.', async () => {
    const messageClick = '클릭 전송 메시지'
    const messageEnter = '엔터 전송 메시지'
    const dispatchMessage = jest.fn()
    const wrapper = mountPageChatRoom({
      computed: {
        room: () => ({ id: 'room' }),
      },
      methods: {
        dispatchMessage,
      },
    })
    const changeText = async (text: string) => {
      const textarea = wrapper.find('textarea')
      textarea.setValue(text)
      await wrapper.vm.$nextTick()
    }
    const getExpectMessage = (content: string) => ({
      content,
      contentType: Message.ContentType.Text,
    })

    await changeText(messageEnter)
    expect((wrapper.find('textarea').element as any).value).toEqual(messageEnter)

    wrapper.find('textarea').trigger('keydown.enter')
    await wrapper.vm.$nextTick()
    expect(dispatchMessage).toHaveBeenNthCalledWith(1, getExpectMessage(messageEnter))

    await changeText(messageClick)
    expect((wrapper.find('textarea').element as any).value).toEqual(messageClick)

    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(dispatchMessage).toHaveBeenNthCalledWith(2, getExpectMessage(messageClick))
  })

  it('초대 발송.', () => {
    const requestDialog = jest.fn()
    const id = 'room'
    const wrapper = mountPageChatRoom({
      computed: {
        room: () => ({ id }),
      },
      methods: {
        requestDialog,
      },
    })

    wrapper.findAll('.chat-frame-input-panel__menu-item').at(1).trigger('click')

    expect(requestDialog).toHaveBeenCalledWith({
      dialogType: DialogType.INVITATION,
      params: {
        handleOk: wrapper.vm.handleSendInvitationOk,
      },
    })
  })
})
