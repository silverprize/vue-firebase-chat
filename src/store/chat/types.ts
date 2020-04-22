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
  order: number;
  name: string;
  countPeople: number;
}

interface MessageParams {
  content: string | File[];
  contentType: MessageContentType;
  senderId: string;
}

type FileInfo = {
  uploadId: string
  name: string
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
  Room,
  FileInfo,
  Message,
  MessageParams,
  MessageContentType,
  MessageType,
}
