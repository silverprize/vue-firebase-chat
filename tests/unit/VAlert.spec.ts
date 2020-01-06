import { mount } from '@vue/test-utils'
import VAlert from '@/components/VAlert/VAlert.vue'

describe('VAlert.vue', () => {
  it('메시지는 default slot으로 나타냄.', () => {
    const message = '메시지'
    const wrapper = mount(VAlert, {
      slots: { default: message },
    })
    expect(wrapper.text()).toEqual(message)
  })
})
