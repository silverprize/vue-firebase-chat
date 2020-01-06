import { createLocalVue, mount, ThisTypedMountOptions } from '@vue/test-utils'
import VueRouter, { Route } from 'vue-router'
import PageChatRoomList from '@/views/chat-room-list/PageChatRoomList.vue'
import RouteName from '@/router/route.name'

const setEnableSpinner = jest.fn()

describe('PageChatRoomList.vue', () => {
  it('방목록에 방 2개 렌더링.', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const roomListData = [
      { name: 'Moon', countPeople: 10 },
      { name: 'Pluto', countPeople: 1 },
    ]
    const mockOptions: ThisTypedMountOptions<PageChatRoomList> = {
      localVue,
      computed: {
        roomList: () => roomListData,
      },
      router: new VueRouter({
        routes: [{ path: '/', name: RouteName.ChatRoom }],
      }),
    }
    const wrapper = mount(PageChatRoomList, mockOptions)
    expect(wrapper.findAll('.chat-room-list-room').length).toEqual(2)
  })

  it('나가기 버튼 클릭.', () => {
    const replace = jest.fn()
    const mockOptions: ThisTypedMountOptions<PageChatRoomList> = {
      mocks: {
        $router: {
          replace,
        },
      },
      computed: {
        roomList: () => ([]),
      },
    }
    const wrapper = mount(PageChatRoomList, mockOptions)
    wrapper.find('button').trigger('click')
    expect(replace).toHaveBeenCalled()
  })

  it('채팅방 목록 페이지 진입후 서버에 방목록 요청(updateRoomList).', async () => {
    const updateRoomList = jest.fn()
    const mockOptions: ThisTypedMountOptions<PageChatRoomList> = {
      computed: {
        roomList: () => ([]),
      },
      methods: {
        setEnableSpinner,
        updateRoomList,
      },
    }
    const wrapper = mount(PageChatRoomList, mockOptions)
    ;(wrapper.vm as any).beforeRouteEnter(
      null as never,
      null as never,
      (callback: Function) => callback(wrapper.vm),
    )
    await wrapper.vm.$nextTick()
    expect(updateRoomList).toHaveBeenCalled()
  })

  it('채팅방 목록에서 페이지에서 나가면 서버 연결 해제 호출(disconnect).', async () => {
    const disconnect = jest.fn()
    const mockOptions: ThisTypedMountOptions<PageChatRoomList> = {
      computed: {
        roomList: () => ([]),
      },
      methods: {
        setEnableSpinner,
        disconnect,
      },
    }
    const wrapper = mount(PageChatRoomList, mockOptions)
    ;(wrapper.vm as any).beforeRouteLeave(
      { name: RouteName.Main } as Route,
      null as never,
      () => {},
    )
    await wrapper.vm.$nextTick()
    expect(disconnect).toHaveBeenCalled()
  })

  it('채팅방 목록에서 채팅방 선택하면 메소드로 채팅방 페이지로 이동($router.replace).', () => {
    const replace = jest.fn()
    const mockOptions: ThisTypedMountOptions<PageChatRoomList> = {
      mocks: {
        $router: {
          replace,
        },
      },
      computed: {
        roomList: () => ([]),
      },
      methods: {
        setEnableSpinner,
      },
    }
    const wrapper = mount(PageChatRoomList, mockOptions)
    ;(wrapper.vm as any).beforeRouteLeave(
      { name: RouteName.ChatRoom } as Route,
      null as never,
      () => {},
    )
    wrapper.find('button').trigger('click')
    expect(replace).toHaveBeenCalled()
  })
})
