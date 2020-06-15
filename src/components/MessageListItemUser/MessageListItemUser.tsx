import { Component, Prop, Vue } from 'vue-property-decorator'

import './MessageListItemUser.scss'
import { formatDatetime } from '@/utils/datetimeFormatter'
import { Message } from '@/services/backend'

@Component
export default class MessageListItemUser extends Vue {
  @Prop({ type: Object, required: true })
  private readonly message!: Message

  @Prop(Boolean)
  private readonly isMyMessage!: boolean

  private imageLoaded = false

  private imageErrored = false

  private get senderInitial() {
    return this.message.sender.name[0]
  }

  private get isText() {
    return this.message.contentType === Message.ContentType.Text
  }

  private get isImage() {
    return this.message.contentType === Message.ContentType.Image
  }

  private get content() {
    return this.message.content || null as any
  }

  private handleImageLoaded() {
    this.imageLoaded = true
    this.$emit('messageLoaded', this.message)
  }

  private handleImageError() {
    this.imageErrored = true
    this.handleImageLoaded()
  }

  mounted() {
    this.$emit('messageLoaded', this.message)
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
            {this.message.sender.name}
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
                  {!this.imageErrored
                    ? <img
                      class="message-list-item-user-balloon__content-image"
                      src={this.content}
                      alt=""
                      on={{
                        '~load': this.handleImageLoaded,
                        '~error': this.handleImageError,
                      }}
                    />
                    : '이미지 불러오기 실패'
                  }
                  {!this.imageLoaded &&
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
              >{formatDatetime(this.message.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
