import { Message } from '@/services/backend'

export interface EnterRoom {
  (roomId: string): Promise<void>
}

export interface LeaveRoom {
  (): Promise<void>
}

export interface DispatchMessage {
  (message: Message.Params): Promise<void>
}

export interface SendInvitation {
  (uid: string): Promise<void>
}
