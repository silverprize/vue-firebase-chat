import { mount } from '@vue/test-utils'
import Alert from '@/components/Alert.vue'

describe('Alert.vue', () => {
  it('message prop이 렌더링되어야 한다.', () => {
    const message = '메시지'
    const wrapper = mount(Alert, {
      propsData: {
        message,
      },
    })
    expect(wrapper.text()).toEqual(message)
  })
})
