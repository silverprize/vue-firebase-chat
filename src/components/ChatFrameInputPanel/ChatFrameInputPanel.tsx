import * as tsx from 'vue-tsx-support'
import { modifiers } from 'vue-tsx-support'
import { Component, Prop, Ref } from 'vue-property-decorator'

import './ChatFrameInputPanel.scss'
import VButton from '@/components/VButton/VButton'
import { SyntheticEvent, TextareaHTMLAttributes } from 'vue-tsx-support/types/dom'
import { KeyCode } from '@/types/common'

interface ChatFrameInputPanelProps {
  disabled: boolean;
}

interface ChatFrameInputPanelEvents {
  onTextSubmitted(text: string): void;
}

interface ChatFrameInputPanelSlots {
  menus: { focusInput: () => void; disabled: boolean; };
}

@Component
export default class ChatFrameInputPanel extends tsx.Component<ChatFrameInputPanelProps, ChatFrameInputPanelEvents, ChatFrameInputPanelSlots> {
  @Ref()
  private readonly textareaElement!: HTMLTextAreaElement

  @Prop()
  private readonly disabled!: boolean

  private sendButtonEnabled = false

  private handleInput($event: SyntheticEvent<TextareaHTMLAttributes>) {
    this.sendButtonEnabled = `${$event.target.value}`.trim().length > 0
  }

  private handleKeyDown($event: KeyboardEvent) {
    if ($event.keyCode === KeyCode.Enter) {
      $event.preventDefault()
    }

    if (!this.sendButtonEnabled || $event.keyCode !== KeyCode.Enter) {
      return
    }

    if ($event.altKey) {
      this.textareaElement.value += '\n'
    } else {
      this.emitText()
    }
  }

  private handleSendClick() {
    if (!this.sendButtonEnabled) {
      return
    }
    this.emitText()
    this.focusInput()
  }

  private emitText() {
    const textMessage = this.textareaElement.value
    if (textMessage) {
      this.$emit('textSubmitted', textMessage)
      this.textareaElement.value = ''
      this.sendButtonEnabled = false
    }
  }

  public focusInput() {
    this.textareaElement.focus()
  }

  render() {
    return (
      <div class="chat-frame-input-panel">
        <div class="chat-frame-input-panel__menu">
          {this.$scopedSlots.menus({ focusInput: this.focusInput, disabled: this.disabled })}
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
            disabled={this.disabled}
            onInput={this.handleInput}
            onKeydown={modifiers.enter(this.handleKeyDown)}
          />
          <div class="chat-frame-input-panel__send-button-container">
            <VButton
              type="submit"
              class="chat-frame-input-panel__send-button button button_yellow"
              disabled={this.disabled || !this.sendButtonEnabled}
              onClick={this.handleSendClick}
            >
              전송
            </VButton>
          </div>
        </div>
      </div>
    )
  }
}
