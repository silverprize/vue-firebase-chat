import { modifiers } from 'vue-tsx-support'
import { Component, Ref, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import './PageMain.scss'
import RouteName from '@/router/route.name'
import VAlert from '@/components/VAlert/VAlert'
import VButton from '@/components/VButton/VButton'
import VPage from '@/components/VPage/VPage'
import logo from '@/assets/hula_loop_octodex03.gif'
import { WithGlobalSpinner } from '@/decorators/WithGlobalSpinner'
import { CHECK_USER_SESSION, SIGN_IN } from '@/store/session/actions.type'
import { WithBlocking } from '@/decorators/WithBlocking'
import { Session } from '@/services/backend'

@Component
export default class PageMain extends Vue {
  @Ref()
  private readonly idElement!: HTMLInputElement

  @Action(CHECK_USER_SESSION)
  readonly checkUserSession!: () => Promise<Session>

  @Action(SIGN_IN)
  readonly signIn!: (name: string) => Promise<void>

  private name = ''

  private message = ''

  private get validName() {
    return this.name.trim()
  }

  @WithBlocking
  @WithGlobalSpinner
  private async handleSubmit() {
    try {
      this.message = ''
      await this.signIn(this.validName)
      this.goToLobby()
    } catch (e) {
      this.message = e.message
    }
  }

  goToLobby() {
    this.$router.push({
      name: RouteName.ChatRoomList,
    })
  }

  @WithGlobalSpinner
  async mounted() {
    try {
      const session = await this.checkUserSession()
      if (session.currentRoomId) {
        this.$router.push({
          name: RouteName.ChatRoom,
          params: { roomId: session.currentRoomId },
        })
      } else {
        this.goToLobby()
      }
    } catch {
      this.idElement.focus()
    }
  }

  render() {
    return (
      <VPage class="main">
        <h1 class="main__title">
          <a
            href="https://github.com/silverprize/vue-firebase-chat"
            target="_blank"
          >vue-firebase-chat</a>
        </h1>
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
              대화명
            </label>
            <input
              id="chatId"
              ref="idElement"
              v-model={this.name}
              class="main__input"
              type="text"
              placeholder="홍길동"
              autocomplete="off"
            />
          </div>
          <VButton
            type="submit"
            variant="brown"
            disabled={!this.validName}
          >
            접속
          </VButton>
        </form>
      </VPage>
    )
  }
}
