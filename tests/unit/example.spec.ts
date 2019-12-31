import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message'
    const wrapper = shallowMount(Home, {
      propsData: { message },
    })
    expect(wrapper.text()).toMatch(message)
  })
})
