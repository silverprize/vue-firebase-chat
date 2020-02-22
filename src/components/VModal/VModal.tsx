import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import './VModal.scss'
import VButton from '@/components/VButton/VButton'

interface VModalProps {
  okLabel?: string;
  closeLabel?: string;
}

interface VModalEvents {
  ok?: () => void
  close?: () => void
}

@Component({
  components: { VButton },
})
export default class VModal extends tsx.Component<VModalProps, {}, VModalEvents> {
  @Prop({ type: String, default: '확인' })
  private readonly okLabel!: string

  @Prop({ type: String, default: '닫기' })
  private readonly closeLabel!: string

  render() {
    return (
      <div class="dialog-background">
        <div class="dialog-window">
          <div class="dialog-body">
            {this.$slots.default}
          </div>
          <div class="dialog-footer">
            {this.closeLabel &&
              <VButton
                variant="light"
                class="dialog-footer__close-button"
                onClick={($event) => this.$emit('ok', $event)}
              >
                {this.closeLabel}
              </VButton>
            }
            <VButton
              variant="yellow"
              onClick={($event) => this.$emit('close', $event)}
            >
              {this.okLabel}
            </VButton>
          </div>
        </div>
      </div>
    )
  }
}
