import { ChatUser } from '@/services/backend'

declare namespace InvitationDialog {
  export interface Params {
    usersPromise?: Promise<ChatUser[]>;
    handleOk?: (uid: string) => void;
    handleClose?: () => void;
  }
}

declare namespace MessageDialog {
  export interface Params {
    message: string[] | string;
    okText: string;
    closeText: string;
    handleOk?: () => void;
    handleClose?: () => void;
  }
}

declare namespace ConfirmInvitationDialog {
  export interface Params {
    id: string;
    inviter: { id: string; name: string; };
    room: { id: string; name: string; };
    handleOk?: (roomId: string) => void;
    handleClose?: () => void;
  }
}

enum DialogType {
  MESSAGE = 'message',
  INVITATION = 'invitation',
  CONFIRM_INVITATION = 'confirm',
}

export { DialogType, InvitationDialog, MessageDialog, ConfirmInvitationDialog }
