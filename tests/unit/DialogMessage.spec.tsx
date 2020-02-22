import DialogMessage from '@/components/DialogMessage/DialogMessage'
import { mount } from '@vue/test-utils'

describe('DialogMessage', () => {
  test('props', () => {
    const wrapper = mount(DialogMessage, {
      propsData: {
        okLabel: 'okok',
        closeLabel: null,
        messageList: [
          'ab',
          'cd',
        ],
      },
    })

    expect(wrapper.find('.dialog-content').element.textContent).toBe('abcd')
    expect(wrapper.find('button').element.textContent).toBe('okok')
    expect(wrapper.findAll('button').length).toBe(1)
  })
})
