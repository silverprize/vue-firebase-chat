import { Component, Prop, Vue } from 'vue-property-decorator'

import './MessageListItemUser.scss'
import { Message, MessageContentType } from '@/types'
import { formatDatetime } from '@/utils/datetimeFormatter'

@Component
export default class MessageListItemUser extends Vue {
  @Prop({ type: Object, required: true })
  private readonly message!: Message

  @Prop(Boolean)
  private readonly isMyMessage!: boolean

  private isContentLoaded = false

  private get senderInitial() {
    return this.message.senderId[0]
  }

  private get isText() {
    return this.message.contentType === MessageContentType.Text
  }

  private get isImage() {
    return this.message.contentType === MessageContentType.Image
  }

  private contentLoaded() {
    this.isContentLoaded = true
    this.$emit('messageLoaded')
  }

  mounted() {
    if (this.isText) {
      this.contentLoaded()
    }
  }

  render() {
    return (
      <div
        staticClass="message-list-item-user"
        class={{ 'message-list-item-user-me': this.isMyMessage }}
      >
        {!this.isMyMessage &&
        <div class="message-list-item-user-initial">
          {this.senderInitial}
        </div>
        }
        <div
          staticClass="message-list-item-user-text-box"
          class={`message-list-item-user-text-box_align_${this.isMyMessage ? 'right' : 'left'}`}
        >
          {!this.isMyMessage &&
          <div class="message-list-item-user-sender">
            {this.message.senderId}
          </div>
          }
          <div
            staticClass="message-list-item-user-balloon"
            class={`message-list-item-user-balloon_align_${this.isMyMessage ? 'right' : 'left'}`}
          >
            <div
              staticClass="message-list-item-user-balloon__arrow"
              class={`message-list-item-user-balloon__arrow_direction_${this.isMyMessage ? 'right' : 'left'}`}
            />
            <div
              staticClass="message-list-item-user-balloon__content"
              class={{ 'message-list-item-user-balloon__content_color_yellow': this.isMyMessage }}
            >
              {(
                this.isText &&
                <pre class="message-list-item-user-balloon__content-text">{this.message.content}</pre>
              ) || (
                this.isImage &&
                <div class="message-list-item-user-balloon__content-image-wrapper">
                  <img
                    class="message-list-item-user-balloon__content-image"
                    src={this.message.content || null as any}
                    alt=""
                    on={{
                      '~load': this.contentLoaded,
                      '~error': this.contentLoaded,
                    }}
                  />
                  {!this.isContentLoaded &&
                  <div
                    staticClass="absolute spinner"
                    class={{ spinner_color_light: this.isMyMessage }}
                  />
                  }
                </div>
              )}
              <span
                staticClass="message-list-item-user-balloon__datetime"
                class={{ 'message-list-item-user-balloon__datetime_align_right': this.isMyMessage }}
              >{formatDatetime(this.message.sentAt)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
