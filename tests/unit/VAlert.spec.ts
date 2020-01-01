import { mount } from '@vue/test-utils'
import VAlert from '@/components/VAlert/VAlert.vue'

describe('VAlert.vue', () => {
  it('메시지는 default slot으로 나타낸다.', () => {
    const message = '메시지'
    const wrapper = createVAlert({ message })
    console.info('text', wrapper.text())
    expect(wrapper.text()).toEqual(message)
  })

  it('외부에서 받은 class attribute value가 나타나야 한다.', () => {
    const externalClass = 'ext-class'
    const wrapper = createVAlert({ className: externalClass })
    console.info('classes', wrapper.find(VAlert).classes())
    expect(wrapper.find(VAlert).classes()).toContain(externalClass)
  })
})

function createVAlert(args:{ className?: string, message?: string } = {}) {
  const template = [
    '<VAlert',
    args.className ? ` class="${args.className}"` : '',
    '>',
    args.message ? args.message : '',
    '</VAlert>',
  ].join('')
  return mount({
    components: {
      VAlert,
    },
    template,
  }).find(VAlert)
}
