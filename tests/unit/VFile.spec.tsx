import { mount } from '@vue/test-utils'
import VFile from '@/components/VFile/VFile'

describe('VFile', () => {
  it('input element의 change 이벤트 발생하면 onSelectFile이벤트로 File[]를 내보낸다', () => {
    const wrapper = mount(VFile)
    wrapper.find('input').trigger('change')
    expect(wrapper.emitted('selectFile')![0][0]).toBeInstanceOf(Array)
  })
})
