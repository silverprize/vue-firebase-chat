import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('데이터 id와 input 태그가 바인딩 되어야 한다.', () => {
    const id = 'guest'
    const wrapper = shallowMount(Home, {
      data: () => ({ id }),
    })
    expect(wrapper.vm.$data.id).toMatch(id)
  })
})
