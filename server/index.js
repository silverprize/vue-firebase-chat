const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
const fs = require('fs').promises
const http = require('http')
const Koa = require('koa')
const send = require('koa-send')
const docRoot = path.join(__dirname, '../dist')
const nodeModulesRoot = path.join(__dirname, 'node_modules')
const uploadRoot = path.join(__dirname, imageBaseUrl)
const roots = [nodeModulesRoot, uploadRoot, docRoot]

async function serve(ctx, next) {
  const filePath = ctx.path.replace('/images', '').replace('/', '')
  let done = false
  let i = 0
  do {
    const root = roots[i++]
    done = await sendFile(ctx, root, filePath)
  } while (!done && i < roots.length)
  if (!done) {
    await next()
  }
}

async function sendFile(ctx, root, filePath) {
  try {
    const stats = await fs.stat(path.join(root, filePath))
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

const port = process.env.PORT || 3000
const app = new Koa()
app.use(serve).use(index)

const server = http.createServer(app.callback()).listen(port, () => {
  console.info(`App running at http://localhost:${port}`)
})
require('./socketEventHandler')(server)
