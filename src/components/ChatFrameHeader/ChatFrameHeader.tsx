import { Component, Vue } from 'vue-property-decorator'
import './ChatFrameHeader.scss'

@Component
export default class ChatFrameHeader extends Vue {
  render() {
    return (
      <div class="chat-frame-header">
        {this.$slots.default}
      </div>
    )
  }
}
