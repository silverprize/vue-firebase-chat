import SocketIO from 'socket.io-client'
import SocketIOFileClient from 'socket.io-file-client'
import { MessageContentType, MessageParams, Room } from '@/types'
import {
  REQ_INVITE,
  REQ_JOIN,
  REQ_LEAVE,
  REQ_MESSAGE,
  REQ_PEOPLE_IN_ROOM,
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
}
const socket = SocketIO({
  autoConnect: false,
})
const uploader = new SocketIOFileClient(socket)
const roomEventListeners: ListenerInfo[] = []

socket.on('disconnect', () => {
  console.info('disconnected')
})

function addEventListener(event: string, listener: Function, container: ListenerInfo[]) {
  container.push({
    event,
    listener,
  })
  socket.on(event, listener)
}

function listenRoomEvent(callback: (event: string, args: any) => void) {
  [
    RES_NEW_MESSAGE,
    RES_JOINED,
    RES_LEFT,
    RES_IMAGE_UPLOADED,
  ].forEach((event) => {
    addEventListener(event, (data: any) => callback(event, data), roomEventListeners)
  })
}

function stopListenRoomEvent() {
  roomEventListeners.forEach(({ event, listener }) => socket.off(event, listener))
}

function listenInviteEvent(callback: (args: any) => void) {
  socket.off(RES_INVITED, callback)
}

function stopListenInviteEvent(callback: Function) {
  socket.off(RES_INVITED, callback)
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

function fetchRoomInfo(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_ROOM_INFO, resolve)
    socket.emit(REQ_ROOM_INFO, roomName)
  })
}

function getPeopleInRoom(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_PEOPLE_IN_ROOM, resolve)
    socket.emit(REQ_PEOPLE_IN_ROOM, roomName)
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

function invite(params: { userId: string, roomName: string }) {
  return new Promise((resolve) => {
    socket.once(REQ_INVITE, resolve)
    socket.emit(REQ_INVITE, params)
  })
}

function join(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_JOIN, resolve)
    socket.emit(REQ_JOIN, roomName)
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
  getPeopleInRoom,
  fetchRoomInfo,
  dispatchMessage,
  invite,
  join,
  leave,
  listenRoomEvent,
  stopListenRoomEvent,
  listenInviteEvent,
  stopListenInviteEvent,
}
