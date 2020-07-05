import { ChatUser } from '@/services/backend'
import { DialogRequestParams } from '@/store/dialog/index'

export declare namespace InvitationDialog {
  export interface Params {
    usersPromise?: Promise<ChatUser[]>;
    handleOk?: (uid: string) => void;
    handleClose?: () => void;
  }
}

export declare namespace MessageDialog {
  export interface Params {
    message: string[] | string;
    okText?: string;
    closeText?: string;
    handleOk?: () => void;
    handleClose?: () => void;
  }
}

export declare namespace ConfirmInvitationDialog {
  export interface Params {
    inviter: { id: string; name: string; };
    room: { id: string; name: string; };
    handleOk?: (roomId: string) => void;
    handleClose?: () => void;
  }
}

export enum DialogType {
  MESSAGE = 'message',
  INVITATION = 'invitation',
  CONFIRM_INVITATION = 'confirm',
}

export interface RequestDialog {
  (params: DialogRequestParams): Promise<void>
}
