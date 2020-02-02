import SocketIOFileClient from 'socket.io-file-client'
import SocketIO from 'socket.io-client'
import {
  REQ_INVITE,
  REQ_JOIN,
  REQ_LEAVE,
  REQ_MESSAGE,
  REQ_PEOPLE_OTHER_ROOMS,
  REQ_REGISTER_ID,
  REQ_ROOM_INFO,
  REQ_ROOM_LIST,
} from '@/../server/protocol.js'
import { MessageContentType, MessageParams, Room } from '@/types'

interface ListenerInfo {
  event: string;
  listener: Function;
  callback: Function;
}

export default class Socket {
  socketIoOptions = {
    autoConnect: false,
    reconnection: false,
    forceNew: true,
  }

  socket: SocketIOClient.Socket
  uploader: SocketIOFileClient
  socketEventListeners: ListenerInfo[] = []

  constructor(socketIoOptions = {}) {
    this.socketIoOptions = {
      ...this.socketIoOptions,
      ...socketIoOptions,
    }
    this.socket = SocketIO(this.socketIoOptions)
    this.uploader = new SocketIOFileClient(this.socket)
  }

  private runAfterTestConnection(event: string, resolve: () => void, ...args: any[]) {
    if (this.isDisconnected()) {
      resolve()
    } else {
      this.socket.once(event, resolve)
      this.socket.emit(event, ...args)
    }
  }

  setSocketEventListener(eventList: string[], listener: (event: string, args: any) => void) {
    eventList.forEach(event => {
      const callback = (data: any) => listener(event, data)
      this.socketEventListeners.push({
        event,
        listener,
        callback,
      })
      this.socket.on(event, callback)
    })
  }

  removeSocketEventListener(listener: Function) {
    this.socketEventListeners = this.socketEventListeners.filter(info => {
      if (info.listener === listener) {
        this.socket.off(info.event, info.callback)
      }
      return info.listener !== listener
    })
  }

  connect(id: string) {
    return new Promise((resolve, reject) => {
      const connectErrored = () => reject(new Error('서버에 연결할 수 없습니다.'))
      this.socket.connect()
      this.socket.once('connect', () => {
        this.socket.once(REQ_REGISTER_ID, async (err?: string) => {
          if (err) {
            reject(new Error(err))
            this.socket.disconnect()
          } else {
            resolve()
          }
        })
        this.socket.emit(REQ_REGISTER_ID, id)
      })
      this.socket.once('error', connectErrored)
      this.socket.once('connect_error', connectErrored)
    })
  }

  disconnect() {
    this.socket.disconnect()
  }

  isDisconnected() {
    return this.socket.disconnected
  }

  upload(files: FileList, ...args: any[]) {
    this.uploader.upload(files, ...args)
  }

  // 이미지 전송시 upload메소드가 emit을 대신함.
  // 서버에서 이미지 수신 시작할때 REQ_MESSAGE 응답함.
  dispatchMessage(message: MessageParams) {
    return new Promise((resolve) => {
      if (this.isDisconnected()) {
        resolve()
      } else {
        this.socket.once(REQ_MESSAGE, resolve)
        if (message.contentType === MessageContentType.Image) {
          this.upload(message.content as FileList, {
            data: {
              ...message,
              content: '',
            },
          })
        } else {
          this.socket.emit(REQ_MESSAGE, message)
        }
      }
    })
  }

  fetchRoomList(): Promise<Room[]> {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_ROOM_LIST, resolve)
    })
  }

  fetchRoomInfo(room: string) {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_ROOM_INFO, resolve, room)
    })
  }

  fetchAllPeople(): Promise<string[]> {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_PEOPLE_OTHER_ROOMS, resolve)
    })
  }

  invite(params: { chatId: string; room: string }) {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_INVITE, resolve, params)
    })
  }

  join(room: string) {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_JOIN, resolve, room)
    })
  }

  leave() {
    return new Promise((resolve) => {
      this.runAfterTestConnection(REQ_LEAVE, resolve)
    })
  }
}
