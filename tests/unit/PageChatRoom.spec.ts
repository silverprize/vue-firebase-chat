import { createLocalVue, mount, MountOptions } from '@vue/test-utils'
import PageChatRoom from '@/views/chat-room/PageChatRoom.vue'
import { RES_IMAGE_UPLOADED, RES_JOINED, RES_LEFT, RES_NEW_MESSAGE } from '@/../server/protocol.js'
import Vuex from 'vuex'
import storeOptions from '@/store/options'
import RouteName from '@/router/route.name'
import ChatFrameInputPanel from '@/components/ChatFrameInputPanel/ChatFrameInputPanel.vue'
import { KeyCode, MessageContentType } from '@/types'

const setEnableSpinner = jest.fn()
const localVue = createLocalVue()
localVue.use(Vuex)

const baseMockOptions = {
  localVue,
  store: new Vuex.Store(storeOptions),
}

const baseMockMethods = {
  setEnableSpinner,
}

describe('PageChatRoom.vue', () => {
  it('채팅방 페이지 진입후 소켓이벤트(새메시지/입장/퇴장/이미지업로드완료) 리스너 등록하고 서버에 입장 요청.', async () => {
    const room = 'chatRoom'
    const dispatchJoin = jest.fn()
    const setSocketEventListener = jest.fn()
    const mockOptions: MountOptions<PageChatRoom> = {
      ...baseMockOptions,
      methods: {
        ...baseMockMethods,
        setSocketEventListener,
        dispatchJoin,
      },
    }
    const wrapper = mount(PageChatRoom, mockOptions)
    ;(wrapper.vm as any).beforeRouteEnter(
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
      callback: (wrapper.vm as any).socketEventReceived,
    })
    expect(dispatchJoin).toHaveBeenCalledWith(room)
  })

  it('채팅방 페이지 나가면 소켓이벤트 리스너 제거하고 서버에 퇴장 요청.', async () => {
    const dispatchLeave = jest.fn()
    const setSocketEventListener = jest.fn()
    const removeSocketEventListener = jest.fn()
    const mockOptions: MountOptions<PageChatRoom> = {
      ...baseMockOptions,
      methods: {
        ...baseMockMethods,
        setSocketEventListener,
        removeSocketEventListener,
        dispatchLeave,
      },
    }
    const wrapper = mount(PageChatRoom, mockOptions)
    ;(wrapper.vm as any).beforeRouteLeave(
      { name: RouteName.ChatRoomList } as any,
      null as never,
      (callback: Function) => {},
    )
    expect(removeSocketEventListener).toHaveBeenCalledWith((wrapper.vm as any).socketEventReceived)
    expect(dispatchLeave).toHaveBeenCalled()
  })

  it('"메시지"를 입력하고 엔터키를 치면 서버에 전송.', () => {
    const message = '메시지'
    const dispatchMessage = jest.fn()
    const mockOptions: MountOptions<PageChatRoom> = {
      ...baseMockOptions,
      methods: {
        ...baseMockMethods,
        dispatchMessage,
      },
    }
    const wrapper = mount(PageChatRoom, mockOptions)
    const textarea = wrapper.find('textarea')
    ;(textarea.element as HTMLTextAreaElement).value = message
    textarea.trigger('input')
    expect((wrapper.find(ChatFrameInputPanel).vm as any).textMessage).toEqual(message)
    textarea.trigger('keydown.enter')
    expect(dispatchMessage).toHaveBeenCalledWith({
      content: message,
      contentType: MessageContentType.Text,
      senderId: '',
    })
  })
})
