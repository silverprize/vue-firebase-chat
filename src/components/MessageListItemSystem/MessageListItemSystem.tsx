import { Component, Prop, Vue } from 'vue-property-decorator'
import './MessageListItemSystem.scss'
import { Message } from '@/services/backend'

@Component
export default class MessageListItemSystem extends Vue {
  @Prop({ type: Object, required: true })
  private readonly message!: Message

  mounted() {
    this.$emit('messageLoaded', this.message)
  }

  render() {
    return (
      <div class="message-list-item-system">
        {this.message.content}
      </div>
    )
  }
}
