import MessageListItemUser from '@/components/MessageListItemUser/MessageListItemUser'
import { mount } from '@vue/test-utils'
import { MessageContentType } from '@/services/socket'

describe('MessageListItemUser', () => {
  test('render message', () => {
    const wrapper = mount(MessageListItemUser, {
      propsData: {
        message: {
          content: 'a',
          contentType: MessageContentType.Text,
        },
        isMyMessage: true,
      },
    })

    expect(wrapper.emitted('messageLoaded')).toBeTruthy()
    expect(wrapper.find('pre').text()).toBe('a')
  })

  test('render image', async () => {
    const wrapper = mount(MessageListItemUser, {
      propsData: {
        message: {
          content: 'a',
          contentType: MessageContentType.Image,
          senderId: 'b',
        },
      },
    })

    wrapper.find('img').element.dispatchEvent(new Event('load'))

    expect(wrapper.find('img')).toBeTruthy()
    expect(wrapper.emitted('messageLoaded')).toBeTruthy()
  })
})
