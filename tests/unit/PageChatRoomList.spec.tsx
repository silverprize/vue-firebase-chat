import { mount, ThisTypedMountOptions } from '@vue/test-utils'
import PageChatRoomList from '@/views/chat-room-list/PageChatRoomList'
import RouteName from '@/router/route.name'
import { Route } from 'vue-router'

const mountPageRoomList = ({
  mocks,
  computed,
  router,
  methods = {},
}: ThisTypedMountOptions<PageChatRoomList> = {}) => {
  const mock = PageChatRoomList.extend({
    methods,
  })
  return mount<PageChatRoomList>(mock, {
    mocks,
    computed: {
      rooms: jest.fn(() => []),
      ...computed,
    },
    router,
    stubs: {
      'router-link': true,
    },
  })
}

describe('PageChatRoomList.tsx', () => {
  it('방목록에 방 2개 렌더링.', () => {
    const roomListData = [
      { name: 'Moon', countPeople: 10 },
      { name: 'Pluto', countPeople: 1 },
    ]
    const wrapper = mountPageRoomList({
      computed: {
        rooms: () => roomListData,
      },
    })
    expect(wrapper.findAll('.chat-room-list-room').length).toEqual(2)
  })

  it('나가기 버튼 클릭.', () => {
    const wrapper = mountPageRoomList({
      mocks: {
        $router: {
          replace: jest.fn(),
        },
      },
    })
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.$router.replace).toBeCalledWith({ name: RouteName.Main })
  })

  it('채팅방 목록 페이지 진입하면 방목록 로드.', async () => {
    const wrapper = mountPageRoomList({
      methods: {
        enterLobby: jest.fn(),
      },
    })
    await wrapper.vm.beforeRouteEnter(
      { name: RouteName.Main } as Route,
      null as never,
      (cb) => cb(wrapper.vm),
    )
    expect(wrapper.vm.$options!.methods!.enterLobby).toHaveBeenCalled()
  })

  it('채팅방 목록 페이지를 떠나면 서버 연결 해제.', async () => {
    const wrapper = mountPageRoomList({
      methods: {
        signOut: jest.fn(),
        leaveLobby: jest.fn(),
      },
    })

    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.Main } as Route,
      null as never,
      () => {},
    )
    expect(wrapper.vm.$options!.methods!.leaveLobby).toHaveBeenCalled()
  })

  it('채팅방 목록에서 채팅방으로 이동.', async () => {
    const wrapper = mountPageRoomList({
      mocks: {
        $router: {
          replace: jest.fn(),
        },
      },
      methods: {
        leaveLobby: jest.fn(),
      },
    })
    await wrapper.vm.beforeRouteLeave(
      { name: RouteName.ChatRoom } as Route,
      null as never,
      () => {},
    )
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.$router.replace).toHaveBeenCalled()
  })
})
