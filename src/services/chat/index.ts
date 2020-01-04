import SocketIO from 'socket.io-client'
import SocketIOFileClient from 'socket.io-file-client'
import { MessageContentType, MessageParams, Room } from '@/types'
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

type ListenerInfo = {
  event: string,
  listener: Function
  callback: Function
}
const socket = SocketIO({
  autoConnect: false,
})
const uploader = new SocketIOFileClient(socket)
let socketEventListeners: ListenerInfo[] = []

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
    socket.once(REQ_REGISTER_ID, async (err?: string) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve()
      }
    })
    socket.emit(REQ_REGISTER_ID, id)
  })
}

function disconnect() {
  return new Promise((resolve) => {
    socket.once('disconnect', resolve)
    socket.disconnect()
  })
}

function fetchRoomList(): Promise<Room[]> {
  return new Promise((resolve) => {
    socket.once(REQ_ROOM_LIST, resolve)
    socket.emit(REQ_ROOM_LIST)
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
  return new Promise((resolve) => {
    socket.once(REQ_JOIN, resolve)
    socket.emit(REQ_JOIN, room)
  })
}

function leave() {
  return new Promise((resolve) => {
    socket.once(REQ_LEAVE, resolve)
    socket.emit(REQ_LEAVE)
  })
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
