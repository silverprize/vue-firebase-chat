<template>
  <div class="chat-frame-input-panel">
    <div class="chat-frame-input-panel__menu">
      <slot
        name="menu"
        v-bind="{ focusInput }"
      />
    </div>
    <div class="chat-frame-input-panel__input-area">
      <label
        for="inputBox"
        class="sr-only"
      >입력상자</label>
      <textarea
        id="inputBox"
        ref="textareaElement"
        class="chat-frame-input-panel__input"
        :value="textMessage"
        @input="textMessageChanged"
        @keydown.enter="enterKeyTyped"
      />
      <div class="chat-frame-input-panel__send-button-container">
        <VButton
          type="submit"
          class="chat-frame-input-panel__send-button button button_yellow"
          :disabled="!textMessage.length"
          @click="sendButtonClicked"
        >
          전송
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import './ChatFrameInputPanel.scss'
import VFile from '@/components/VFile/VFile.vue'
import VButton from '@/components/VButton/VButton.vue'
import { KeyCode } from '@/types'

@Component({
  components: { VButton, VFile },
})
export default class ChatFrameInputPanel extends Vue {
  textMessage = ''

  @Ref()
  readonly textareaElement!: HTMLTextAreaElement

  textMessageChanged({ target }: KeyboardEvent) {
    this.textMessage = (target as HTMLTextAreaElement).value
  }

  enterKeyTyped($event: KeyboardEvent) {
    if ($event.keyCode === KeyCode.Enter) {
      if ($event.altKey) {
        this.textMessage = this.textMessage.concat('\n')
      } else {
        $event.preventDefault()
        if (!this.textMessage.trim()) {
          return
        }
        this.$emit('text-submitted', this.textMessage)
        this.textMessage = ''
      }
    }
  }

  sendButtonClicked() {
    this.focusInput()
  }

  focusInput() {
    this.textareaElement.focus()
  }
}
</script>
