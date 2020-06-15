import { ActionContext, Module } from 'vuex'
import { RootState } from '@/store/root'
import { NEXT_DIALOG, REQUEST_DIALOG } from '@/store/dialog/actions.type'
import {
  ConfirmInvitationDialog,
  DialogType,
  InvitationDialog,
  MessageDialog,
} from '@/store/dialog/types'
import {
  GET_CURRENT_CONFIRM_INVITATION_DIALOG,
  GET_CURRENT_INVITATION_DIALOG,
  GET_CURRENT_MESSAGE_DIALOG,
} from '@/store/dialog/getters.type'
import { fetchUsers, Profile, Room } from '@/services/backend'
import { GET_PROFILE } from '@/store/session/getters.type'
import { GET_ROOM_INFO } from '@/store/chat/getters.type'

interface DialogRequestParams {
  dialogType: DialogType;
  params: MessageDialog.Params | InvitationDialog.Params | ConfirmInvitationDialog.Params;
}

interface State {
  [DialogType.MESSAGE]: {
    current: MessageDialog.Params | null;
    queue: MessageDialog.Params[];
  },
  [DialogType.INVITATION]: {
    current: InvitationDialog.Params | null;
    queue: InvitationDialog.Params[];
  },
  [DialogType.CONFIRM_INVITATION]: {
    current: ConfirmInvitationDialog.Params | null;
    queue: ConfirmInvitationDialog.Params[];
  },
}

const dialog: Module<State, RootState> = {
  state: () => ({
    [DialogType.MESSAGE]: {
      current: null,
      queue: [],
    },
    [DialogType.INVITATION]: {
      current: null,
      queue: [],
    },
    [DialogType.CONFIRM_INVITATION]: {
      current: null,
      queue: [],
    },
  }),
  getters: {
    [GET_CURRENT_MESSAGE_DIALOG]: (state) => state[DialogType.MESSAGE].current,
    [GET_CURRENT_INVITATION_DIALOG]: (state) => state[DialogType.INVITATION].current,
    [GET_CURRENT_CONFIRM_INVITATION_DIALOG]: (state) => state[DialogType.CONFIRM_INVITATION].current,
  },
  actions: {
    [REQUEST_DIALOG](context: ActionContext<State, RootState>, { dialogType, params }: DialogRequestParams) {
      switch (dialogType) {
        case DialogType.MESSAGE:
          showMessageDialog(context, params as MessageDialog.Params)
          break
        case DialogType.INVITATION:
          showInvitationDialog(context, params as InvitationDialog.Params)
          break
        case DialogType.CONFIRM_INVITATION:
          showConfirmInvitationDialog(context, params as ConfirmInvitationDialog.Params)
          break
      }
    },
    [NEXT_DIALOG](context, dialogType: DialogType) {
      context.state[dialogType].current = null
      setTimeout(() => {
        context.state[dialogType].current = context.state[dialogType].queue.pop() || null
      }, 100)
    },
  },
}

function consumeDialogRequest(
  { state, dispatch } : ActionContext<State, RootState>,
  { dialogType, params }: { dialogType: DialogType, params: any },
) {
  if (state[dialogType].current != null) {
    state[dialogType].queue.unshift(params)
  } else {
    state[dialogType].current = params
  }
}

function showInvitationDialog(context: ActionContext<State, RootState>, params: InvitationDialog.Params) {
  const profile: Profile = context.getters[GET_PROFILE]
  const currentRoom: Room = context.getters[GET_ROOM_INFO]
  consumeDialogRequest(context, {
    dialogType: DialogType.INVITATION,
    params: {
      usersPromise: fetchUsers()
        .then((users) =>
          users.filter((user) =>
            profile.uid !== user.id && user.currentRoomId !== currentRoom.id)),
      handleOk: params.handleOk,
    },
  })
}

function showConfirmInvitationDialog(context: ActionContext<State, RootState>, params: ConfirmInvitationDialog.Params) {
  consumeDialogRequest(context, {
    dialogType: DialogType.CONFIRM_INVITATION,
    params,
  })
}

function showMessageDialog(context: ActionContext<State, RootState>, params: MessageDialog.Params) {
  consumeDialogRequest(context, {
    dialogType: DialogType.MESSAGE,
    params,
  })
}

export default dialog
export { DialogRequestParams }
