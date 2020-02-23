enum MessageType {
  User,
  System,
}

enum MessageContentType {
  Text,
  Image,
}

enum KeyCode {
  Enter = 13,
}

enum Dialog {
  INVITATION,
  CONFIRM_INVITATION,
  MESSAGE,
}

interface Message {
  sequence: number;
  type: MessageType;
  content: string;
  contentType: MessageContentType;
  senderId: string;
  sentAt: string;
  uploadId?: string;
}

interface MessageParams {
  content: string | File[];
  contentType: MessageContentType;
  senderId: string;
}

interface Room {
  name: string;
  countPeople: number;
}

type RouteEnterNext<T> = (next: (vm: T) => any) => void

type RouteNext = (next?: boolean) => void

type RouterLinkSlotProps = {
  href: string;
  navigate: () => void
}

export {
  MessageType,
  MessageContentType,
  KeyCode,
  Dialog,
  Message,
  MessageParams,
  Room,
  RouteEnterNext,
  RouteNext,
  RouterLinkSlotProps,
}
