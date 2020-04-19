interface Message {
  sequence: number;
  type: MessageType;
  content: string;
  contentType: MessageContentType;
  senderId: string;
  sentAt: string;
  uploadId?: string;
}

interface Room {
  name: string;
  countPeople: number;
}

interface MessageParams {
  content: string | File[];
  contentType: MessageContentType;
  senderId: string;
}

enum MessageType {
  User,
  System,
}

enum MessageContentType {
  Text,
  Image,
}

export {
  Message,
  MessageParams,
  Room,
  MessageContentType,
  MessageType,
}
