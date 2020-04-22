import { mount, MountOptions } from '@vue/test-utils'
import PageChatBase from '@/views/chat-base/PageChatBase'
import { OPEN_INVITATION_DIALOG } from '@/services/eventBus/event.name'
import eventBus from '@/services/eventBus'
import Vue from 'vue'
import { Dialog } from '@/types/common'

jest.mock('@/services/eventBus', () => ({
  listen(this: any, vm: Vue, event: string, method: Function) {
    this.$on(event, method)
    vm.$on('hook:destroyed', () => {
      this.$off(event, method)
    })
  },
  $on: jest.fn(),
  $off: jest.fn(),
}))

const baseMockStubs = {
  RouterView: '<div/>',
}

describe('PageChatBase.tsx', () => {
  beforeEach(() => {
    eventBus.$on = jest.fn()
    eventBus.$off = jest.fn()
  })

  // TODO unit test migration
  // it('PageChatBase 컴포넌트 인스턴스가 만들어지면 소켓이벤트(입장/퇴장/초대/연결끊김)와 eventBus이벤트(초대 열기) 리스너 등록.', () => {
  //   const setSocketEventListener = jest.fn()
  //   const mockOptions: MountOptions<PageChatBase> = {
  //     stubs: {
  //       ...baseMockStubs,
  //     },
  //     methods: {
  //       setSocketEventListener,
  //     },
  //   }
  //   const wrapper = mount(PageChatBase, mockOptions)
  //   expect(eventBus.$on).toHaveBeenCalledWith(OPEN_INVITATION_DIALOG, wrapper.vm.openInvitationDialog)
  // })

  // TODO unit test migration
  // it('PageChatBase 컴포넌트 인스턴스가 소멸하면 소켓이벤트와 eventBus 리스너 제거.', async () => {
  //   const setSocketEventListener = jest.fn()
  //   const removeSocketEventListener = jest.fn()
  //   const mockOptions: MountOptions<PageChatBase> = {
  //     stubs: {
  //       ...baseMockStubs,
  //     },
  //     methods: {
  //       setSocketEventListener,
  //       removeSocketEventListener,
  //     },
  //   }
  //   const wrapper = mount(PageChatBase, mockOptions)
  //   wrapper.vm.$destroy()
  //   await wrapper.vm.$nextTick()
  //   expect(eventBus.$off).toHaveBeenCalledWith(OPEN_INVITATION_DIALOG, wrapper.vm.openInvitationDialog)
  // })

  // TODO unit test migration
  // it('서버 연결이 끊기면 알림 다이얼로그 호출.', () => {
  //   const mockOptions: MountOptions<PageChatBase> = {
  //     stubs: {
  //       ...baseMockStubs,
  //     },
  //   }
  //   const wrapper = mount(PageChatBase, mockOptions)
  //   expect(wrapper.vm.dialogProps[Dialog.MESSAGE].visible).toBeTruthy()
  // })
})
