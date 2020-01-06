import { mount } from '@vue/test-utils'
import PageMain from '@/views/main/PageMain.vue'

const setEnableSpinner = jest.fn()

describe('PageMain.vue', () => {
  it('data id와 input value 바인딩.', () => {
    const id = 'guest'
    const wrapper = mount(PageMain, {
      data: () => ({ id: '' }),
    })
    wrapper.setData({ id })
    expect((wrapper.find('input').element as HTMLInputElement).value).toMatch(id)
  })

  it('id를 입력하지 않으면 접속 버튼 비활성화.', () => {
    const wrapper = mount(PageMain, {
      data: () => ({ id: '' }),
    })
    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBeTruthy()
  })

  it('id를 입력하면 접속 버튼 활성화.', () => {
    const wrapper = mount(PageMain, {
      data: () => ({ id: 'guest' }),
    })
    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBeFalsy()
  })

  it('id를 입력하고 로그인을 누르면 채팅방 페이지로.', async () => {
    const push = jest.fn()
    const connectToServer = jest.fn()
    const wrapper = mount(PageMain, {
      mocks: {
        $router: {
          push,
        },
      },
      methods: {
        setEnableSpinner,
        connectToServer,
      },
    })
    wrapper.vm.$data.id = 'guest'
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(connectToServer).toHaveBeenCalled()
    expect(push).toHaveBeenCalled()
  })

  it('서버 접속 실패하면 소켓 인스턴스 갱신 호출.', async () => {
    const connectToServer = jest.fn(() => {
      throw new Error()
    })
    const newSocket = jest.fn()
    const wrapper = mount(PageMain, {
      methods: {
        setEnableSpinner,
        connectToServer,
        newSocket,
      },
    })
    wrapper.vm.$data.id = 'guest'
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(newSocket).toHaveBeenCalled()
  })
})
