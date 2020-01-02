import { shallowMount } from '@vue/test-utils'
import PageMain from '@/views/main/PageMain.vue'

describe('PageMain.vue', () => {
  it('data id와 input value가 바인딩 되어야 한다.', () => {
    const id = 'guest'
    const wrapper = shallowMount(PageMain, {
      data: () => ({ id: '' }),
    })
    wrapper.setData({ id })
    expect(wrapper.vm.$data.id).toMatch(id)
  })
})
