import { Component, Vue } from 'vue-property-decorator'
import './VBadge.scss'

@Component
export default class VBadge extends Vue {
  render() {
    return (
      <span class="badge">
        {this.$slots.default}
      </span>
    )
  }
}
