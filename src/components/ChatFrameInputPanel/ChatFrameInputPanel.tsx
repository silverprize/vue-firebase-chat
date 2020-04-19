import * as tsx from 'vue-tsx-support'
import { modifiers } from 'vue-tsx-support'
import { Component, Ref } from 'vue-property-decorator'

import './ChatFrameInputPanel.scss'
import VButton from '@/components/VButton/VButton'
import { SyntheticEvent, TextareaHTMLAttributes } from 'vue-tsx-support/types/dom'
import { KeyCode } from '@/types/common'

interface ChatFrameInputPanelEvents {
  onTextSubmitted(text: string): void;
}

interface ChatFrameInputPanelSlots {
  menu: { focusInput: () => void };
}

@Component
export default class ChatFrameInputPanel extends tsx.Component<{}, ChatFrameInputPanelEvents, ChatFrameInputPanelSlots> {
  @Ref()
  private readonly textareaElement!: HTMLTextAreaElement

  private sendButtonEnabled = false

  private typed($event: SyntheticEvent<TextareaHTMLAttributes>) {
    this.sendButtonEnabled = `${$event.target.value}`.trim().length > 0
  }

  private enterKeyTyped($event: KeyboardEvent) {
    if (!this.sendButtonEnabled || $event.keyCode !== KeyCode.Enter) {
      return
    }
    if ($event.altKey) {
      this.textareaElement.value += '\n'
    } else {
      $event.preventDefault()
      this.emitText()
    }
  }

  private sendButtonClicked() {
    if (!this.sendButtonEnabled) {
      return
    }
    this.emitText()
    this.focusInput()
  }

  private emitText() {
    const textMessage = this.textareaElement.value
    this.$emit('textSubmitted', textMessage)
    this.textareaElement.value = ''
  }

  private focusInput() {
    this.textareaElement.focus()
  }

  render() {
    return (
      <div class="chat-frame-input-panel">
        <div class="chat-frame-input-panel__menu">
          {this.$scopedSlots.menu({ focusInput: this.focusInput })}
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
            onInput={this.typed}
            onKeydown={modifiers.enter(this.enterKeyTyped)}
          />
          <div class="chat-frame-input-panel__send-button-container">
            <VButton
              type="submit"
              class="chat-frame-input-panel__send-button button button_yellow"
              disabled={!this.sendButtonEnabled}
              onClick={this.sendButtonClicked}
            >
              전송
            </VButton>
          </div>
        </div>
      </div>
    )
  }
}
