import { mount } from '@vue/test-utils'
import MessageListItemSystem from '@/components/MessageListItemSystem/MessageListItemSystem'

describe('MessageListItemSystem', () => {
  it('props', () => {
    const wrapper = mount(MessageListItemSystem, {
      propsData: {
        message: {
          content: 'a',
        },
      },
    })

    expect(wrapper.text()).toBe('a')
    expect(wrapper.emitted('messageLoaded')).toBeTruthy()
  })
})
