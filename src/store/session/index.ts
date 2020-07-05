import { ActionContext, Module } from 'vuex'
import { RESET, SET_CONNECTED, SET_PROFILE, SET_SIGNED_IN } from './mutations.type'
import { GET_PROFILE, IS_CONNECTING, IS_SIGNED_IN, IS_VALID } from './getters.type'
import { CHECK_USER_SESSION, SIGN_IN, SIGN_OUT } from '@/store/session/actions.type'
import { RootState } from '@/store/root'
import {
  ChatEvent,
  checkUserSession,
  Profile,
  signIn,
  signOut,
  subscribeAuthState,
  subscribeConnectionState,
  subscribeInvitation,
} from '@/services/backend'
import { ConfirmInvitationDialog } from '@/store/dialog/types'
import { bus } from '@/services/bus'

interface State {
  user: Profile | null;
  isConnecting: boolean;
  isSignedIn: boolean;
  unsubscribes: (() => void)[];
}

const sessionModule: Module<State, RootState> = {
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
      bus.$emit(ChatEvent.DISCONNECTED)
    }
    context.commit(SET_CONNECTED, connected)
  }
  const onInvite = (invitation: ConfirmInvitationDialog.Params) => {
    bus.$emit(ChatEvent.INVITATION_RECEIVED, invitation)
  }

  context.commit(RESET)
  context.state.unsubscribes.push(
    subscribeInvitation(onInvite),
    subscribeAuthState(onAuthChanged),
    subscribeConnectionState(onConnectionChanged),
  )
}

export { sessionModule }
