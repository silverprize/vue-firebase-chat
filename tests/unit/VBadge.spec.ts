import { mount } from '@vue/test-utils'
import VBadge from '@/components/VBadge/VBadge.vue'

describe('VBadge.vue', () => {
  it('레이블은 default slot으로 나타낸다.', () => {
    const message = '레이블'
    const wrapper = createVBadge({ message })
    console.info('text', wrapper.text())
    expect(wrapper.text()).toEqual(message)
  })

  it('외부에서 받은 class attribute value가 나타나야 한다.', () => {
    const externalClass = 'ext-class'
    const wrapper = createVBadge({ className: externalClass })
    console.info('classes', wrapper.find(VBadge).classes())
    expect(wrapper.find(VBadge).classes()).toContain(externalClass)
  })
})

function createVBadge(args:{ className?: string, message?: string } = {}) {
  const template = [
    '<VBadge',
    args.className ? ` class="${args.className}"` : '',
    '>',
    args.message ? args.message : '',
    '</VBadge>',
  ].join('')
  return mount({
    components: {
      VBadge,
    },
    template,
  }).find(VBadge)
}
