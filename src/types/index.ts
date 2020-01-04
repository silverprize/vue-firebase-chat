export enum MessageType {
  Chat,
  System,
}
export enum MessageContentType {
  Text,
  Image,
}

export enum KeyCode {
  Enter = 13,
}

export type Message = {
  type: MessageType
  content: string
  contentType: MessageContentType
  senderId: string
  sentAt: string
}

export type MessageParams = {
  content: string | FileList
  contentType: MessageContentType
  senderId: string
}

export type Room = {
  name: string
  countPeople: number
}

export type InvitationRequest = {
  inviter: string
  room: string
}
