import { Component, Vue } from 'vue-property-decorator'
import './VPage.scss'

@Component
export default class VPage extends Vue {
  render() {
    return (
      <div class="page">
        {this.$slots.default}
      </div>
    )
  }
}
