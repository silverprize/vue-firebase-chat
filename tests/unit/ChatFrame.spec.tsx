import ChatFrame from '@/components/ChatFrame/ChatFrame'
import { mount } from '@vue/test-utils'

describe('ChatFrame', () => {
  it('renders', () => {
    const wrapper = mount(ChatFrame, {
      slots: {
        default: '<div>abcd</div>',
      },
    })
    expect(wrapper.text()).toBe('abcd')
    expect(wrapper).toMatchSnapshot()
  })
})
