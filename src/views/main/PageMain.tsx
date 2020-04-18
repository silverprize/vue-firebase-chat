import { modifiers } from 'vue-tsx-support'
import { Component, Mixins, Ref } from 'vue-property-decorator'
import { Action, Mutation } from 'vuex-class'

import './PageMain.scss'
import { NEW_SOCKET } from '@/store/root/mutations.type'
import { CONNECT } from '@/store/session/actions.type'
import RouteName from '@/router/route.name'
import VAlert from '@/components/VAlert/VAlert'
import VButton from '@/components/VButton/VButton'
import GlobalSpinnerHandler from '@/mixins/GlobalSpinnerHandler'
import VPage from '@/components/VPage/VPage'
import logo from '@/assets/logo.png'

@Component
export default class PageMain extends Mixins(GlobalSpinnerHandler) {
  @Ref()
  private readonly idElement!: HTMLElement

  @Mutation(NEW_SOCKET)
  private readonly newSocket!: () => void

  @Action(CONNECT)
  private readonly connectToServer!: (id: string) => Promise<void>

  private id = ''
  private message = ''

  private get validId() {
    return this.id.trim()
  }

  private async connect() {
    this.startSpinner()
    try {
      await this.connectToServer(this.validId)
      this.$router.push({
        name: RouteName.ChatRoomList,
      })
    } catch (e) {
      this.newSocket()
      this.message = e.message
    }
    this.stopSpinner()
  }

  mounted() {
    this.idElement.focus()
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
          onSubmit={modifiers.prevent(this.connect)}
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
