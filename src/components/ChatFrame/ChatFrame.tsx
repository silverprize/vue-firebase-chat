import { Component, Vue } from 'vue-property-decorator'

import './ChatFrame.scss'
import VPage from '@/components/VPage/VPage'

@Component
export default class ChatFrame extends Vue {
  render() {
    return (
      <VPage>
        {this.$slots.default}
      </VPage>
    )
  }
}
