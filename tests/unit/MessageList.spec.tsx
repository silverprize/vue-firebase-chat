import MessageList from '@/components/MessageList/MessageList'
import { mount } from '@vue/test-utils'
import { Message } from '@/services/backend'

describe('MessageList', () => {
  test('props', () => {
    const wrapper = mount(MessageList, {
      propsData: {
        messageList: [
          { id: 1, content: 'a' },
          { id: 2, content: 'b' },
        ],
      },
      scopedSlots: {
        default({ message }: { message: Message }) {
          return <span>{message.content}</span>
        },
      },
    })

    expect(wrapper.findAll('li').length).toBe(2)
    expect(wrapper.text()).toBe('ab')
  })
})
