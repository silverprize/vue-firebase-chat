import { createLocalVue, mount, ThisTypedMountOptions } from '@vue/test-utils'
import PageChatRoom from '@/views/chat-room/PageChatRoom'
import { RES_IMAGE_UPLOADED, RES_JOINED, RES_LEFT, RES_NEW_MESSAGE } from '@/../server/protocol.js'
import Vuex from 'vuex'
import rootModule from '@/store/root'
import RouteName from '@/router/route.name'
import { MessageContentType } from '@/types'
import eventBus from '@/services/eventBus'
import { OPEN_INVITATION_DIALOG } from '@/services/eventBus/event.name'

jest.mock('@/services/eventBus', () => ({
  send: jest.fn(),
}))

const mountPageChatRoom = ({
  methods = {},
  computed = {},
}: ThisTypedMountOptions<PageChatRoom> = {}) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return mount(PageChatRoom, {
    localVue,
    store: new Vuex.Store(rootModule),
    methods: {
      setEnableSpinner: jest.fn(),
      ...methods,
    },
    computed,
  })
}

describe('PageChatRoom', () => {
  it('채팅방 페이지 진입후 소켓이벤트(새메시지/입장/퇴장/이미지업로드완료) 리스너 등록하고 서버에 입장 요청.', async () => {
    const room = 'chatRoom'
    const dispatchJoin = jest.fn()
    const setSocketEventListener = jest.fn()
    const wrapper = mountPageChatRoom({
      methods: {
        setSocketEventListener,
        dispatchJoin,
      },
    })

    await wrapper.vm.beforeRouteEnter(
      { params: { room } } as any,
      null as never,
      (callback: Function) => callback(wrapper.vm),
    )

    expect(setSocketEventListener).toHaveBeenCalledWith({
      event: [
        RES_NEW_MESSAGE,
        RES_JOINED,
        RES_LEFT,
        RES_IMAGE_UPLOADED,
      ],
      callback: wrapper.vm.socketEventReceived,
    })
    expect(dispatchJoin).toHaveBeenCalledWith(room)
  })

  it('채팅방 페이지를 떠날때 소켓이벤트 리스너 제거하고 서버에 퇴장 요청.', async () => {
    const dispatchLeave = jest.fn()
    const setSocketEventListener = jest.fn()
    const removeSocketEventListener = jest.fn()
    const wrapper = mountPageChatRoom({
      methods: {
        setSocketEventListener,
        removeSocketEventListener,
        dispatchLeave,
      },
    })

    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.ChatRoomList } as any,
      null as never,
      () => {},
    )

    expect(removeSocketEventListener).toHaveBeenCalledWith(wrapper.vm.socketEventReceived)
    expect(dispatchLeave).toHaveBeenCalled()
  })

  it('"메시지"를 입력하고 전송 버튼 클릭 또는 엔터키 치면 서버에 전송.', async () => {
    const messageClick = '클릭 전송 메시지'
    const messageEnter = '엔터 전송 메시지'
    const dispatchMessage = jest.fn()
    const wrapper = mountPageChatRoom({
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
      contentType: MessageContentType.Text,
      senderId: '',
    })

    await changeText(messageEnter)
    expect((wrapper.find('textarea').element as any).value).toEqual(messageEnter)

    wrapper.find('textarea').trigger('keydown.enter')
    expect(dispatchMessage).toHaveBeenNthCalledWith(1, getExpectMessage(messageEnter))

    await changeText(messageClick)
    expect((wrapper.find('textarea').element as any).value).toEqual(messageClick)

    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatchMessage).toHaveBeenNthCalledWith(2, getExpectMessage(messageClick))
  })

  it('초대 메뉴를 누르면 요청자가 속한 방이름을 파라미터로 초대요청 다이얼로그 오픈 이벤트 발송.(eventBus.send)', () => {
    const room = 'room'
    const wrapper = mountPageChatRoom({
      computed: {
        roomName: () => room,
      },
    })

    wrapper.findAll('.chat-frame-input-panel__menu-item').at(1).trigger('click')

    expect(eventBus.send).toHaveBeenCalledWith(OPEN_INVITATION_DIALOG, room)
  })
})
