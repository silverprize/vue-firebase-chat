import { Component, Vue } from 'vue-property-decorator'
import './VAlert.scss'

@Component
export default class VAlert extends Vue {
  render() {
    return (
      <div class="alert">
        {this.$slots.default}
      </div>
    )
  }
}
