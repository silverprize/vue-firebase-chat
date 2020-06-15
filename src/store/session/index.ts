import { ActionContext, Module } from 'vuex'
import { RESET, SET_CONNECTED, SET_PROFILE, SET_SIGNED_IN } from './mutations.type'
import { GET_PROFILE, IS_CONNECTING, IS_SIGNED_IN, IS_VALID } from './getters.type'
import { CHECK_USER_SESSION, SIGN_IN, SIGN_OUT } from '@/store/session/actions.type'
import { RootState } from '@/store/root'
import {
  checkUserSession,
  consumeInvitation,
  Profile,
  signIn,
  signOut,
  subscribeAuthState,
  subscribeConnectionState,
  subscribeInvitation,
} from '@/services/backend'
import { ConfirmInvitationDialog, DialogType } from '@/store/dialog/types'
import { REQUEST_DIALOG } from '@/store/dialog/actions.type'
import RouteName from '@/router/route.name'
import router from '@/router'

interface State {
  user: Profile | null;
  isConnecting: boolean;
  isSignedIn: boolean;
  unsubscribes: (() => void)[];
}

const module: Module<State, RootState> = {
  state: () => ({
    user: null,
    isConnecting: false,
    isSignedIn: false,
    unsubscribes: [],
  }),
  getters: {
    [IS_CONNECTING]: state => state.isConnecting,
    [IS_SIGNED_IN]: state => state.isSignedIn,
    [IS_VALID]: (state, getters) => getters[IS_CONNECTING] && getters[IS_SIGNED_IN],
    [GET_PROFILE]: state => state.user,
  },
  mutations: {
    [SET_PROFILE](state, profile: Profile) {
      state.user = profile
    },
    [SET_CONNECTED](state, isConnecting: boolean) {
      state.isConnecting = isConnecting
    },
    [SET_SIGNED_IN](state, isSignedIn: boolean) {
      state.isSignedIn = isSignedIn
    },
    [RESET](state) {
      state.unsubscribes.forEach(unsubscribe => unsubscribe())
      state.user = null
      state.isConnecting = false
      state.isSignedIn = false
      state.unsubscribes = []
    },
  },
  actions: {
    async [CHECK_USER_SESSION](context) {
      const session = await checkUserSession()
      if (session) {
        await subscribeSessionEvents(context)
      } else {
        throw new Error('Unauthorized')
      }
      return session
    },
    async [SIGN_IN](context, id) {
      await signIn(id)
      await subscribeSessionEvents(context)
    },
    async [SIGN_OUT]({ commit }) {
      await signOut()
      commit(RESET)
    },
  },
}

function subscribeSessionEvents(context: ActionContext<State, RootState>) {
  const onAuthChanged = (profile: Profile | null) => {
    if (profile) {
      context.commit(SET_PROFILE, profile)
    }
    context.commit(SET_SIGNED_IN, profile != null)
  }
  const onConnectionChanged = (connected: boolean) => {
    if (context.getters[IS_CONNECTING] && !connected) {
      context.dispatch(REQUEST_DIALOG, {
        dialogType: DialogType.MESSAGE,
        params: {
          message: '서버와 연결이 끊겼습니다.',
          closeText: '',
        },
      })
    }
    context.commit(SET_CONNECTED, connected)
  }
  const onInvite = (invitation: ConfirmInvitationDialog.Params) => {
    context.dispatch(REQUEST_DIALOG, {
      dialogType: DialogType.CONFIRM_INVITATION,
      params: {
        ...invitation,
        handleOk: () => {
          consumeInvitation(invitation.id)
          router.push({
            name: RouteName.ChatRoom,
            params: { roomId: invitation.room.id },
          })
        },
      },
    })
  }

  context.commit(RESET)
  context.state.unsubscribes.push(
    subscribeInvitation(onInvite),
    subscribeAuthState(onAuthChanged),
    subscribeConnectionState(onConnectionChanged),
  )
}

export default module
