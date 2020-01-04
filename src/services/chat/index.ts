import SocketIO from 'socket.io-client'
import SocketIOFileClient from 'socket.io-file-client'
import { MessageContentType, MessageParams, Room } from '@/types'
import {
  BUILTIN_DISCONNECT,
  REQ_INVITE,
  REQ_JOIN,
  REQ_LEAVE,
  REQ_MESSAGE,
  REQ_PEOPLE_IN_ROOM,
  REQ_PEOPLE_OTHER_ROOMS,
  REQ_REGISTER_ID,
  REQ_ROOM_INFO,
  REQ_ROOM_LIST,
  RES_IMAGE_UPLOADED,
  RES_INVITED,
  RES_JOINED,
  RES_LEFT,
  RES_NEW_MESSAGE,
} from '@/../server/protocol.js'

type ListenerInfo = {
  event: string,
  listener: Function
  callback: Function
}
const socket = SocketIO({
  autoConnect: false,
  reconnection: false,
  forceNew: true,
})
const uploader = new SocketIOFileClient(socket)
let socketEventListeners: ListenerInfo[] = []

const chatEventList = [
  REQ_REGISTER_ID,
  REQ_ROOM_LIST,
  REQ_ROOM_INFO,
  REQ_PEOPLE_IN_ROOM,
  REQ_MESSAGE,
  REQ_INVITE,
  REQ_JOIN,
  REQ_LEAVE,
  REQ_PEOPLE_OTHER_ROOMS,
  RES_NEW_MESSAGE,
  RES_JOINED,
  RES_LEFT,
  RES_INVITED,
  RES_IMAGE_UPLOADED,
]
const connectionErrorEventList = [
  'connect_error',
  BUILTIN_DISCONNECT,
]
connectionErrorEventList.forEach(eventName => {
  socket.on(eventName, function (event: string) {
    chatEventList.forEach(chatEvent => socket.off(chatEvent))
    socket.disconnect()
  }.bind(null, eventName))
})

function setSocketEventListener(eventList: string[], listener: (event: string, args: any) => void) {
  eventList.forEach(event => {
    const callback = (data: any) => listener(event, data)
    socketEventListeners.push({
      event,
      listener,
      callback,
    })
    socket.on(event, callback)
  })
}

function removeSocketEventListener(listener: Function) {
  socketEventListeners = socketEventListeners.filter(info => {
    if (info.listener === listener) {
      socket.off(info.event, info.callback)
    }
    return info.listener !== listener
  })
}

function connect(id: string) {
  return new Promise((resolve, reject) => {
    socket.connect()
    socket.once('connect', () => {
      socket.once(REQ_REGISTER_ID, async (err?: string) => {
        if (err) {
          reject(new Error(err))
          socket.disconnect()
        } else {
          resolve()
        }
      })
      socket.emit(REQ_REGISTER_ID, id)
    })
    socket.once('connect_error', () => {
      reject(new Error('서버에 연결할 수 없습니다.'))
    })
  })
}

function disconnect() {
  return new Promise((resolve) => {
    socket.disconnect()
  })
}

function fetchRoomList(): Promise<Room[]> {
  return new Promise((resolve, reject) => {
    runAfterTestConnection(REQ_ROOM_LIST, resolve, reject)
  })
}

function fetchRoomInfo(room: string) {
  return new Promise((resolve) => {
    socket.once(REQ_ROOM_INFO, resolve)
    socket.emit(REQ_ROOM_INFO, room)
  })
}

function fetchAllPeople(): Promise<string[]> {
  return new Promise((resolve) => {
    socket.once(REQ_PEOPLE_OTHER_ROOMS, resolve)
    socket.emit(REQ_PEOPLE_OTHER_ROOMS)
  })
}

function dispatchMessage(message: MessageParams) {
  return new Promise(async (resolve) => {
    socket.once(REQ_MESSAGE, resolve)
    if (message.contentType === MessageContentType.Image) {
      uploader.upload(message.content as FileList, {
        data: {
          ...message,
          content: '',
        },
      })
    } else {
      socket.emit(REQ_MESSAGE, message)
    }
  })
}

function invite(params: { chatId: string, room: string }) {
  return new Promise((resolve) => {
    socket.once(REQ_INVITE, resolve)
    socket.emit(REQ_INVITE, params)
  })
}

function join(room: string) {
  return new Promise((resolve, reject) => {
    runAfterTestConnection(REQ_JOIN, resolve, reject, room)
  })
}

function leave() {
  return new Promise((resolve, reject) => {
    runAfterTestConnection(REQ_LEAVE, resolve, reject)
  })
}

function runAfterTestConnection(event: string, resolve: () => void, reject: (reason?: any) => void, ...args: any[]) {
  if (socket.disconnected) {
    reject(new Error('Disconnected'))
  } else {
    socket.once(event, resolve)
    socket.emit(event, ...args)
  }
}

export {
  connect,
  disconnect,
  fetchRoomList,
  fetchRoomInfo,
  fetchAllPeople,
  dispatchMessage,
  invite,
  join,
  leave,
  setSocketEventListener,
  removeSocketEventListener,
}
