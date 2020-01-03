async function connect() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100)
  })
}
async function disconnect() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100)
  })
}

async function getRoomList() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { name: 'Moon', countPeople: 1 },
      { name: 'Mercury', countPeople: 2 },
      { name: 'Mars', countPeople: 3 },
      { name: 'Earth', countPeople: 4 },
      { name: 'Pluto', countPeople: 5 },
      { name: 'Uranus', countPeople: 6 },
    ]), 100)
  })
}

async function getPeopleInRoom(roomName) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { countPeople: 1, name: 'Moon' },
      { countPeople: 2, name: 'Mercury' },
      { countPeople: 3, name: 'Mars' },
      { countPeople: 4, name: 'Earth' },
      { countPeople: 5, name: 'Pluto' },
      { countPeople: 6, name: 'Uranus' },
    ]), 100)
  })
}

async function getRoomInfo(roomName) {
  return { id: 1, name: 'Moon' }
}

async function emitMessage() {}
async function emitImage() {}
async function invite() {}
async function join({ userId, roomName }) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100)
  })
}

export {
  connect,
  disconnect,
  getRoomList,
  getPeopleInRoom,
  getRoomInfo,
  emitMessage,
  emitImage,
  invite,
  join,
}
