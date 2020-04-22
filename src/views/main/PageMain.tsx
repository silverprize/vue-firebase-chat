import { modifiers } from 'vue-tsx-support'
import { Component, Ref, Vue } from 'vue-property-decorator'

import './PageMain.scss'
import RouteName from '@/router/route.name'
import VAlert from '@/components/VAlert/VAlert'
import VButton from '@/components/VButton/VButton'
import VPage from '@/components/VPage/VPage'
import logo from '@/assets/logo.png'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { CHECK_SESSION, CONNECT } from '@/store/session/actions.type'
import { Action } from 'vuex-class'

@Component
export default class PageMain extends Vue {
  @Ref()
  private readonly idElement!: HTMLElement

  @Action(CONNECT)
  private readonly connect!: (id: string) => Promise<void>

  @Action(CHECK_SESSION)
  private readonly checkSession!: () => Promise<void>

  private id = ''

  private message = ''

  private get validId() {
    return this.id.trim()
  }

  @WithGlobalSpinner
  private async handleSubmit() {
    try {
      await this.connect(this.validId)
      this.goToLobby()
    } catch (e) {
      this.message = e.message
    }
  }

  @WithGlobalSpinner
  async mounted() {
    try {
      await this.checkSession()
      this.goToLobby()
    } catch {
      this.idElement.focus()
    }
  }

  goToLobby() {
    this.$router.push({
      name: RouteName.ChatRoomList,
    })
  }

  render() {
    return (
      <VPage class="main">
        <img
          class="main__logo"
          src={logo}
          alt="Logo"
        />
        {this.message &&
          <VAlert class="main__message">
            {this.message}
          </VAlert>
        }
        <form
          class="main__form"
          onSubmit={modifiers.prevent(this.handleSubmit)}
        >
          <div class="main__form-group">
            <label
              class="main__input-label"
              for="chatId"
            >
              아이디
            </label>
            <input
              id="chatId"
              ref="idElement"
              v-model={this.id}
              class="main__input"
              type="text"
              placeholder="홍길동"
              autocomplete="off"
            />
          </div>
          <VButton
            type="submit"
            variant="brown"
            disabled={!this.validId}
          >
            접속
          </VButton>
        </form>
      </VPage>
    )
  }
}
