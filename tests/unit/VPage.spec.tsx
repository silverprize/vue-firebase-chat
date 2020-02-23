import { mount } from '@vue/test-utils'
import VPage from '@/components/VPage/VPage'

describe('VPage', () => {
  it('VPage로 감쌀 콘텐트를 default slot에 넣는다', () => {
    const wrapper = mount(VPage, {
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
