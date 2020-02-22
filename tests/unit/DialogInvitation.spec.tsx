import DialogInvitation from '@/components/DialogInvitation/DialogInvitation'
import { mount } from '@vue/test-utils'

const mountDialogInvitation = () => {
  return mount(DialogInvitation, {
    propsData: {
      people: [
        'a',
        'b',
        'c',
      ],
    },
  })
}

describe('DialogInvitation', () => {
  test('props', () => {
    const wrapper = mountDialogInvitation()

    expect(wrapper.findAll('option').length).toBe(3)
  })

  test('emit', () => {
    const wrapper = mountDialogInvitation()
    wrapper.setData({ guest: 'a' })
    wrapper.findAll('button').trigger('click')

    expect(wrapper.emitted('ok')[0][0]).toBe('a')
    expect(wrapper.emitted('close').length).toBe(1)
  })
})
