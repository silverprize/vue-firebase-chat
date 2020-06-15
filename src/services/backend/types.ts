import { UserInfo } from 'firebase/app'

namespace Message {
  export interface Params {
    content: string | File[] | null;
    contentType: Message.ContentType;
  }
  export enum Type {
    User = 'USER',
    System = 'SYSTEM',
  }

  export enum ContentType {
    Text = 'TEXT',
    Image = 'IMAGE',
  }
}

type Profile = UserInfo

type Timestamp = number

interface Message {
  id: string,
  type: Message.Type;
  content: string;
  contentType: Message.ContentType;
  sender: {
    id: string;
    name: string;
  };
  createdAt: Timestamp;
}

interface ChatUser {
  id: string;
  name: string;
  joinedAt: Timestamp;
}

interface Room {
  id: string;
  order: number;
  name: string;
  countPeople: number;
}

interface Session {
  id: string;
  name: string;
  currentRoomId: string;
}

export {
  Profile,
  Room,
  Message,
  ChatUser,
  Session,
}
