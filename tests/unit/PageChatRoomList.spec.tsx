import { createLocalVue, mount, ThisTypedMountOptions } from '@vue/test-utils'
import VueRouter, { Route } from 'vue-router'
import PageChatRoomList from '@/views/chat-room-list/PageChatRoomList'
import RouteName from '@/router/route.name'

const mountPageRoomList = ({
  localVue,
  mocks,
  computed,
  router,
  methods = {},
}: ThisTypedMountOptions<PageChatRoomList> = {}) => {
  return mount(PageChatRoomList, {
    localVue,
    mocks,
    computed,
    router,
    methods: {
      setEnableSpinner: jest.fn(),
      ...methods,
    },
  })
}

describe('PageChatRoomList.tsx', () => {
  it('방목록에 방 2개 렌더링.', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const roomListData = [
      { name: 'Moon', countPeople: 10 },
      { name: 'Pluto', countPeople: 1 },
    ]
    const wrapper = mountPageRoomList({
      localVue,
      computed: {
        roomList: () => roomListData,
      },
      router: new VueRouter({
        routes: [{ path: '/', name: RouteName.ChatRoom }],
      }),
    })
    expect(wrapper.findAll('.chat-room-list-room').length).toEqual(2)
  })

  it('나가기 버튼 클릭.', () => {
    const replace = jest.fn()
    const wrapper = mountPageRoomList({
      mocks: {
        $router: {
          replace,
        },
      },
      computed: {
        roomList: () => ([]),
      },
    })
    wrapper.find('button').trigger('click')
    expect(replace).toHaveBeenCalled()
  })

  it('채팅방 목록 페이지 진입후 서버에 방목록 요청(updateRoomList).', async () => {
    const updateRoomList = jest.fn()
    const wrapper = mountPageRoomList({
      computed: {
        roomList: () => ([]),
      },
      methods: {
        updateRoomList,
      },
    })
    await wrapper.vm.beforeRouteEnter(
      null as never,
      null as never,
      (callback: Function) => callback(wrapper.vm),
    )
    expect(updateRoomList).toHaveBeenCalled()
  })

  it('채팅방 목록에서 페이지에서 나가면 서버 연결 해제 호출(disconnect).', async () => {
    const disconnect = jest.fn()
    const wrapper = mountPageRoomList({
      computed: {
        roomList: () => ([]),
      },
      methods: {
        disconnect,
      },
    })
    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.Main } as Route,
      null as never,
      () => {},
    )
    expect(disconnect).toHaveBeenCalled()
  })

  it('채팅방 목록에서 채팅방 선택하면 메소드로 채팅방 페이지로 이동($router.replace).', async () => {
    const replace = jest.fn()
    const wrapper = mountPageRoomList({
      mocks: {
        $router: {
          replace,
        },
      },
      computed: {
        roomList: () => ([]),
      },
    })
    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.ChatRoom } as Route,
      null as never,
      () => {},
    )
    wrapper.find('button').trigger('click')
    expect(replace).toHaveBeenCalled()
  })
})
