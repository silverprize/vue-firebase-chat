import { Component, Vue } from 'vue-property-decorator'
import './VSpinner.scss'

@Component
export default class VSpinner extends Vue {
  render() {
    return <div class="spinner" />
  }
}
