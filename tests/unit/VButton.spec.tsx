import { mount } from '@vue/test-utils'
import VButton from '@/components/VButton/VButton'

describe('VButton', () => {
  it('레이블은 default slot으로 나타냄.', () => {
    const label = '레이블'
    const wrapper = mount(VButton, {
      slots: { default: label },
    })
    expect(wrapper.text()).toEqual(label)
  })

  it('button type attribute와 유지.', () => {
    const type = 'submit'
    const wrapper = mount(VButton, {
      propsData: { type },
    })
    expect(wrapper.attributes().type).toEqual(type)
  })

  it('type attribute 생략하면 type="button" 설정.', () => {
    const wrapper = mount(VButton)
    expect(wrapper.attributes().type).toEqual('button')
  })

  it('버튼 스타일은 variant attribute value로 지정.', () => {
    const variant = 'yellow'
    const wrapper = mount(VButton, {
      propsData: { variant },
    })
    expect(wrapper.classes().find(c => c.includes(variant))).toBeTruthy()
  })
})
