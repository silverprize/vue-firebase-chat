import { mount } from '@vue/test-utils'
import VModal from '@/components/VModal/VModal.vue'
import VButton from '@/components/VButton/VButton.vue'

describe('VModel.vue', () => {
  it('default slot으로 VModal의 콘텐트를 채운다.', () => {
    const wrapper = mount(VModal, {
      slots: {
        default: '<div id="test-body">body</div>',
      },
    })

    expect(wrapper.find('#test-body')).toBeTruthy()
  })

  it('footer 버튼 이벤트 검사', () => {
    const wrapper = mount(VModal)

    wrapper.findAll(VButton).trigger('click')

    expect(wrapper.emitted('ok')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('props 동작 검사', () => {
    const wrapper = mount(VModal, {
      propsData: {
        okLabel: 'ok-test',
        closeLabel: null,
      },
    })

    expect(wrapper.findAll(VButton).length).toBe(1)
    expect(wrapper.findAll(VButton).at(0).text()).toBe('ok-test')
  })
})
