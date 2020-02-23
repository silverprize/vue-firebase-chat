import { Component, Vue } from 'vue-property-decorator'

import './ChatFrameBody.scss'

@Component
export default class ChatFrameBody extends Vue {
  render() {
    return (
      <div class="chat-frame-body">
        {this.$slots.default}
      </div>
    )
  }
}
