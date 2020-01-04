const SocketIO = require('socket.io')
const SocketIOFile = require('socket.io-file')
const uuid = require('uuid')
const protocol = require('./protocol')

const Lobby = 'Lobby'
const Moon = 'Moon'
const Mercury = 'Mercury'
const Mars = 'Mars'
const Earth = 'Earth'
const Pluto = 'Pluto'
const Uranus = 'Uranus'

const roomNames = [
  Moon,
  Mercury,
  Mars,
  Earth,
  Pluto,
  Uranus,
]

const status = {
  people: {},
  rooms: {},
  countTotalPeople: 0,
}
status.rooms = roomNames.concat(Lobby).reduce((map, roomName) => {
  map[roomName] = {
    name: roomName,
    countPeople: 0,
  }
  return map
}, {})

function connected(socket) {
  console.info('connected', socket.id)
  socket.on('disconnect', () => {
    console.info('disconnected', socket.id, socket.chatId, socket.currentRoom)
    if (socket.currentRoom) {
      leaveRoom(socket, socket.currentRoom)
    }
    delete status.people[socket.chatId]
    status.countTotalPeople--
  })
}

function registerId(socket, id) {
  const exists = !!status.people[id]
  if (!exists) {
    socket.chatId = id
    status.people[id] = socket
    status.countTotalPeople++
  }
  socket.emit(protocol.REQ_REGISTER_ID, exists ? '접속중인 아이디입니다.' : null)
}

function sendRoomList(socket) {
  socket.emit(protocol.REQ_ROOM_LIST, roomNames.map(roomName => ({
    name: roomName,
    countPeople: status.rooms[roomName].countPeople,
  })))
}

function sendRoomInfo(socket, roomName) {
  socket.emit(protocol.REQ_ROOM_INFO, status.rooms[roomName])
}

function joinRoom(socket, fromRoom, toRoom) {
  return new Promise(async (resolve) => {
    if (fromRoom && fromRoom !== toRoom) {
      await leaveRoom(socket, fromRoom)
    }
    socket.join(toRoom, async () => {
      socket.currentRoom = toRoom
      status.rooms[toRoom].countPeople++
      socket.nsp.to(toRoom).emit(protocol.RES_JOINED, {
        room: toRoom,
        chatId: socket.chatId,
      })
      socket.emit(protocol.REQ_JOIN)
      resolve()
    })
  })
}

function leaveRoom(socket, room) {
  return new Promise(async (resolve) => {
    socket.leave(room, async () => {
      status.rooms[room].countPeople--
      socket.nsp.to(room).emit(protocol.RES_LEFT, {
        room,
        chatId: socket.chatId,
      })
      if (room && room !== Lobby) {
        await joinRoom(socket, null, Lobby)
      }
      socket.emit(protocol.REQ_LEAVE)
      resolve()
    })
  })
}

function broadcastMessageToRoom(socket, message) {
  socket.emit(protocol.REQ_MESSAGE)
  socket.nsp.to(socket.currentRoom).emit(protocol.RES_NEW_MESSAGE, message)
}

function sendInvitation(socket, { chatId, room }) {
  socket.server.sockets[chatId].emit(protocol.RES_INVITED, { chatId: socket.chatId, room }, () => {
    socket.emit(protocol.REQ_INVITE)
  })
}

function attachFileHandler(socket) {
  const uploader = new SocketIOFile(socket, {
    uploadDir: 'data',
    rename: (fileName) => {
      const extName = path.extname(fileName)
      return `${uuid.v1()}${extName}`
    },
  })
  uploader.on('complete', (fileInfo) => {
    socket.emit('msg', fileInfo)
  })
  uploader.on('error', (err) => {
    socket.emit('msg', err)
  })
  uploader.on('abort', (err) => {
    socket.emit('msg', err)
  })
  uploader.on('start', (err) => {
    socket.emit('msg', err)
  })
  socket.emit('msg', 'msg')
}

module.exports = (server) => {
  const chat = new SocketIO(server, {
    pingTimeout: 5000000,
  })
  chat.on('connection', (socket) => {
    connected(socket)

    attachFileHandler(socket)

    socket.on(protocol.REQ_REGISTER_ID, registerId.bind(null, socket))

    socket.on(protocol.REQ_ROOM_LIST, sendRoomList.bind(null, socket))

    socket.on(protocol.REQ_ROOM_INFO, sendRoomInfo.bind(null, socket))

    socket.on(protocol.REQ_JOIN, (room) => joinRoom(socket, socket.currentRoom, room))

    socket.on(protocol.REQ_LEAVE, () => leaveRoom(socket, socket.currentRoom))

    socket.on(protocol.REQ_MESSAGE, broadcastMessageToRoom.bind(null, socket))

    socket.on(protocol.REQ_INVITE, sendInvitation.bind(null, socket))
  })
}
