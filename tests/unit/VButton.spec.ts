import { mount } from '@vue/test-utils'
import VButton from '@/components/VButton/VButton.vue'

describe('VButton.vue', () => {
  it('레이블은 default slot으로 나타낸다.', () => {
    const label = '레이블'
    const wrapper = createVButton({ label })
    console.info('text', wrapper.text())
    expect(wrapper.text()).toEqual(label)
  })

  it('외부에서 받은 class attribute value가 나타나야 한다.', () => {
    const externalClass = 'ext-class'
    const wrapper = createVButton({ className: externalClass })
    console.info('classes', wrapper.classes())
    expect(wrapper.classes()).toContain(externalClass)
  })

  it('button type attribute와 동일하게 설정되어야 한다.', () => {
    const type = 'submit'
    const wrapper = createVButton({ type })
    console.info('attributes', wrapper.attributes())
    expect(wrapper.attributes().type).toEqual(type)
  })

  it('type attribute 생략하면 type="button" 설정된다.', () => {
    const wrapper = createVButton()
    console.info('attributes', wrapper.attributes())
    expect(wrapper.attributes().type).toEqual('button')
  })

  it('버튼 스타일은 variant attribute value로 지정한다.', () => {
    const variant = 'yellow'
    const wrapper = createVButton({ variant })
    console.info('classes', wrapper.classes())
    expect(wrapper.classes().find(c => c.includes(variant))).toBeTruthy()
  })
})

function createVButton(args:{ className?: string, type?: string, variant?:string, label?: string } = {}) {
  const template = [
    '<VButton',
    args.className ? ` class="${args.className}"` : '',
    args.type ? ` type="${args.type}"` : '',
    args.variant ? ` variant="${args.variant}"` : '',
    '>',
    args.label ? args.label : '',
    '</VButton>',
  ].join('')
  return mount({
    components: {
      VButton,
    },
    template,
  }).find(VButton)
}
