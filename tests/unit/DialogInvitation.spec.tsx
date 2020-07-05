import DialogInvitation from '@/components/DialogInvitation/DialogInvitation'
import { mount } from '@vue/test-utils'

const mountDialogInvitation = () => {
  return mount(DialogInvitation, {
    propsData: {
      params: {
        usersPromise: [
          { id: 'a', name: 'a' },
          { id: 'b', name: 'b' },
          { id: 'c', name: 'c' },
        ],
      },
    },
  })
}

describe('DialogInvitation', () => {
  test('props', async () => {
    const wrapper = mountDialogInvitation()
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('option').length).toBe(3)
  })

  test('emit', async () => {
    const wrapper = mountDialogInvitation()
    await wrapper.vm.$nextTick()
    wrapper.findAll('button').trigger('click')
    expect(wrapper.emitted('ok')![0][0]).toBe('a')
    expect(wrapper.emitted('close')!.length).toBe(1)
  })
})
