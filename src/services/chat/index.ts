import SocketIO from 'socket.io-client'
import { MessageParams, Room } from '@/types'
import {
  REQ_INVITE,
  REQ_JOIN,
  REQ_LEAVE,
  REQ_MESSAGE,
  REQ_PEOPLE_IN_ROOM,
  REQ_REGISTER_ID,
  REQ_ROOM_INFO,
  REQ_ROOM_LIST,
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
const roomEventListeners: ListenerInfo[] = []

function addEventListener(event: string, listener: Function, container: ListenerInfo[]) {
  container.push({
    event,
    listener,
  })
  socket.on(event, listener)
}
function listenRoomEvent(callback: (event: string, args: any) => void) {
  addEventListener(RES_NEW_MESSAGE, (data: any) => callback(RES_NEW_MESSAGE, data), roomEventListeners)
  addEventListener(RES_JOINED, (data: any) => callback(RES_JOINED, data), roomEventListeners)
  addEventListener(RES_LEFT, (data: any) => callback(RES_LEFT, data), roomEventListeners)
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

async function connect(id: string) {
  return new Promise((resolve, reject) => {
    socket.connect()
    socket.once(REQ_REGISTER_ID, async (err?: string) => {
      if (err) {
        reject(new Error(err))
      } else {
        await join('Lobby')
        resolve()
      }
    })
    socket.emit(REQ_REGISTER_ID, id)
  })
}
async function disconnect() {
  return new Promise((resolve) => {
    socket.once('disconnect', resolve)
    socket.disconnect()
  })
}

async function fetchRoomList(): Promise<Room[]> {
  return new Promise((resolve) => {
    socket.once(REQ_ROOM_LIST, resolve)
    socket.emit(REQ_ROOM_LIST)
  })
}

async function fetchRoomInfo(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_ROOM_INFO, resolve)
    socket.emit(REQ_ROOM_INFO, roomName)
  })
}

async function getPeopleInRoom(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_PEOPLE_IN_ROOM, resolve)
    socket.emit(REQ_PEOPLE_IN_ROOM, roomName)
  })
}

async function dispatchMessage(message: MessageParams) {
  return new Promise((resolve) => {
    socket.once(REQ_MESSAGE, resolve)
    socket.emit(REQ_MESSAGE, message)
  })
}

async function invite(params: { userId: string, roomName: string }) {
  return new Promise((resolve) => {
    socket.once(REQ_INVITE, resolve)
    socket.emit(REQ_INVITE, params)
  })
}

async function join(roomName: string) {
  return new Promise((resolve) => {
    socket.once(REQ_JOIN, resolve)
    socket.emit(REQ_JOIN, roomName)
  })
}

async function leave() {
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
