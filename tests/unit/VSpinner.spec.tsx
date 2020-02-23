import VSpinner from '@/components/VSpinner/VSpinner'
import { mount } from '@vue/test-utils'

describe('VSpinner', () => {
  test('렌더링 테스트', () => {
    const wrapper = mount(VSpinner)
    expect(wrapper).toMatchSnapshot()
  })
})
