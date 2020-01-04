const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs').promises
const http = require('http')
const Koa = require('koa')
const send = require('koa-send')
const SocketIO = require('socket.io')
const docRoot = path.resolve(__dirname, '../dist')
const nodeModulesRoot = path.resolve(__dirname, 'node_modules')
const uploadRoot = path.resolve(__dirname, 'data')
const roots = [nodeModulesRoot, uploadRoot, docRoot]

async function serve(ctx, next) {
  const filePath = ctx.path.replace('/', '')
  let done = false
  let i = 0
  do {
    const root = roots[i++]
    try {
      done = await sendFile(ctx, root, filePath)
    } catch (e) {}
  } while (!done && i < roots.length)
  if (!done) {
    await next()
  }
}

async function sendFile(ctx, root, filePath) {
  try {
    const stats = await fs.stat(path.resolve(root, filePath))
    if (stats.isFile()) {
      await send(ctx, filePath, { root })
      return true
    }
  } catch (e) {}
  return false
}

async function index(ctx) {
  if (ctx.path !== '/') {
    ctx.redirect('/')
  } else {
    await send(ctx, 'index.html', { root: docRoot })
  }
}

const port = 3000
const app = new Koa()
app.use(serve).use(index)

const server = http.createServer(app.callback()).listen(port, () => {
  console.info(`App running at http://localhost:${port}`)
})
require('./socketEventHandler')(server)
