import { mount, ThisTypedMountOptions } from '@vue/test-utils'
import PageMain from '@/views/main/PageMain'
import RouteName from '@/router/route.name'

const mountPageMain = ({
  mocks = {},
  data = () => ({}),
  methods = {},
}: ThisTypedMountOptions<PageMain> = {}) => {
  const mock = PageMain.extend({
    methods,
    data,
  })
  return mount(mock, { mocks })
}

describe('PageMain.tsx', () => {
  it('data id와 input value 바인딩.', async () => {
    const name = 'guest'
    const wrapper = mountPageMain({
      data: () => ({ name: '' }),
    })

    wrapper.setData({ name })
    await wrapper.vm.$nextTick()

    expect((wrapper.find('input').element as HTMLInputElement).value).toMatch(name)
  })

  it('id를 입력하지 않으면 접속 버튼 비활성화.', () => {
    const wrapper = mountPageMain({
      data: () => ({ name: '' }),
    })
    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBeTruthy()
  })

  it('대화명을 입력하면 접속 버튼 활성화.', () => {
    const wrapper = mount(PageMain, {
      data: () => ({ name: 'guest' }),
    })
    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBeFalsy()
  })

  it('대화명을 입력하고 로그인을 누르면 채팅방 목록 페이지로 이동.', async () => {
    const signIn = jest.fn()
    const push = jest.fn()
    const wrapper = mountPageMain({
      methods: {
        signIn,
      },
      mocks: {
        $router: {
          push,
        },
      },
    })

    wrapper.setData({ name: 'guest' })
    wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect((wrapper.find('#chatId').element as HTMLInputElement).value).toBeTruthy()
    expect(signIn).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith({
      name: RouteName.ChatRoomList,
    })
  })

  it('서버 접속 실패하면 에러 메시지 출력.', async () => {
    const errorMessage = 'error'
    const signIn = jest.fn(() => {
      throw new Error(errorMessage)
    })
    const wrapper = mountPageMain({
      methods: {
        signIn,
      },
    })

    wrapper.setData({ name: 'guest' })
    wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.alert').text()).toEqual(errorMessage)
  })
})
