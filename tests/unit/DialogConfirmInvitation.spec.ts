import DialogConfirmInvitation from '@/components/DialogConfirmInvitation/DialogConfirmInvitation'
import { mount } from '@vue/test-utils'

const mountDialogConfirmInvitation = () => {
  return mount(DialogConfirmInvitation, {
    propsData: {
      inviter: 'a',
      room: 'b',
    },
  })
}
describe('DialogConfirmInvitation', () => {
  test('props', () => {
    const wrapper = mountDialogConfirmInvitation()
    const text = wrapper.findAll('strong')

    expect(text.at(0).text()).toBe('a')
    expect(text.at(1).text()).toBe('b')
  })

  test('emit', () => {
    const wrapper = mountDialogConfirmInvitation()
    wrapper.findAll('button').trigger('click')

    expect(wrapper.emitted('ok').length).toBe(1)
    expect(wrapper.emitted('close').length).toBe(1)
  })
})
