const path = require('path')
const SocketIO = require('socket.io')
const SocketIOFile = require('socket.io-file')
const uuid = require('uuid')
const protocol = require('./protocol')

const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
const Lobby = 'Lobby'
const Moon = 'Moon'
const Mercury = 'Mercury'
const Mars = 'Mars'
const Earth = 'Earth'
const Pluto = 'Pluto'
const Uranus = 'Uranus'

const chatRoomNames = [
  Moon,
  Mercury,
  Mars,
  Earth,
  Pluto,
  Uranus,
]

const status = {
  people: {},
  chatRooms: {},
  countTotalPeople: 0,
}
status.chatRooms = chatRoomNames.concat(Lobby).reduce((map, name) => {
  map[name] = {
    name,
    countPeople: 0,
  }
  return map
}, {})

function connected(socket) {
  console.info('connected', socket.id)
  socket.on('disconnect', () => {
    console.info('disconnected', socket.id, socket.chatId, socket.currentChatRoom)
    if (socket.currentChatRoom) {
      leaveSocketRoom(socket, socket.currentChatRoom)
    }
    delete status.people[socket.chatId]
    status.countTotalPeople--
  })
}

async function registerId(socket, id) {
  const exists = !!status.people[id]
  if (!exists) {
    socket.chatId = id
    status.people[id] = socket
    status.countTotalPeople++
    await joinChatRoom(socket, Lobby)
  }
  socket.emit(protocol.REQ_REGISTER_ID, exists ? '접속중인 아이디입니다.' : null)
}

function sendRoomList(socket) {
  socket.emit(protocol.REQ_ROOM_LIST, chatRoomNames.map(name => ({
    name,
    countPeople: status.chatRooms[name].countPeople,
  })))
}

function sendRoomInfo(socket, chatRoom) {
  socket.emit(protocol.REQ_ROOM_INFO, status.chatRooms[chatRoom])
}

async function joinChatRoom(socket, chatRoom) {
  const { currentChatRoom } = socket
  if (currentChatRoom && currentChatRoom !== chatRoom) {
    await leaveSocketRoom(socket, currentChatRoom)
  }
  await joinSocketRoom(socket, chatRoom)
  socket.currentChatRoom = chatRoom
  socket.nsp.to(chatRoom).emit(protocol.RES_JOINED, {
    room: chatRoom,
    chatId: socket.chatId,
  })
  socket.emit(protocol.REQ_JOIN)
}

async function leaveChatRoom(socket) {
  const { currentChatRoom } = socket
  if (!currentChatRoom) return
  await leaveSocketRoom(socket, currentChatRoom)
  socket.currentChatRoom = null
  socket.nsp.to(currentChatRoom).emit(protocol.RES_LEFT, {
    room: currentChatRoom,
    chatId: socket.chatId,
  })
  if (currentChatRoom !== Lobby) {
    await joinChatRoom(socket, Lobby)
  }
  socket.emit(protocol.REQ_LEAVE)
}

function broadcastMessageToRoom(socket, message) {
  socket.emit(protocol.REQ_MESSAGE)
  broadcast(socket).emit(protocol.RES_NEW_MESSAGE, {
    ...message,
    sentAt: new Date().toISOString(),
  })
}

function sendInvitation(socket, { chatId, room: chatRoom }) {
  const receiver = status.people[chatId]
  if (receiver) {
    receiver.emit(protocol.RES_INVITED, { chatId: socket.chatId, room: chatRoom })
  }
  socket.emit(protocol.REQ_INVITE)
}

function sendPeopleOtherRooms(socket) {
  const people = Object.keys(status.people).reduce((list, otherChatId) => {
    const other = status.people[otherChatId]
    const isMe = otherChatId === socket.chatId
    const sameChatRoom = other.currentChatRoom === socket.currentChatRoom
    if (!isMe && !sameChatRoom) {
      list.push(otherChatId)
    }
    return list
  }, [])
  socket.emit(protocol.REQ_PEOPLE_OTHER_ROOMS, people)
}

function broadcast(socket) {
  return socket.nsp.to(socket.currentChatRoom)
}

function joinSocketRoom(socket, chatRoom) {
  return new Promise((resolve) => {
    socket.join(chatRoom, () => {
      status.chatRooms[chatRoom].countPeople++
      resolve()
    })
  })
}

function leaveSocketRoom(socket, chatRoom) {
  return new Promise((resolve) => {
    socket.leave(chatRoom, () => {
      status.chatRooms[chatRoom].countPeople--
      resolve()
    })
  })
}

function attachFileHandler(socket) {
  const chunkSize = 10240
  const uploader = new SocketIOFile(socket, {
    uploadDir: path.join(__dirname, imageBaseUrl),
    chunkSize,
    rename: (fileName) => {
      const extName = path.extname(fileName)
      return `${uuid.v1()}${extName}`
    },
  })
  uploader.on('stream', (fileInfo) => {
    if (fileInfo.wrote <= chunkSize) {
      broadcastMessageToRoom(socket, {
        ...fileInfo.data,
        uploadId: fileInfo.uploadId,
      })
    }
  })
  uploader.on('complete', (fileInfo) => {
    broadcast(socket).emit(protocol.RES_IMAGE_UPLOADED, {
      ...fileInfo,
      url: `${imageBaseUrl}/${fileInfo.name}`,
    })
  })
  uploader.on('error', (err) => {
    socket.emit(protocol.RES_IMAGE_UPLOADED, err)
  })
  uploader.on('abort', (err) => {
    socket.emit(protocol.RES_IMAGE_UPLOADED, err)
  })
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

    socket.on(protocol.REQ_JOIN, (chatRoom) => joinChatRoom(socket, chatRoom))

    socket.on(protocol.REQ_LEAVE, () => leaveChatRoom(socket))

    socket.on(protocol.REQ_MESSAGE, broadcastMessageToRoom.bind(null, socket))

    socket.on(protocol.REQ_INVITE, sendInvitation.bind(null, socket))

    socket.on(protocol.REQ_PEOPLE_OTHER_ROOMS, sendPeopleOtherRooms.bind(null, socket))
  })
}