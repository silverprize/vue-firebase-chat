import { mount } from '@vue/test-utils'
import VBadge from '@/components/VBadge/VBadge.vue'

describe('VBadge.vue', () => {
  it('레이블은 default slot으로 나타냄.', () => {
    const message = '레이블'
    const wrapper = mount(VBadge, {
      slots: { default: message },
    })
    expect(wrapper.text()).toEqual(message)
  })
})
