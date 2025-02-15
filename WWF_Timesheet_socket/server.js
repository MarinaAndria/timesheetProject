const { createServer } = require('http')
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})
app.use(cors())

const server = createServer(app)

server.listen(4000, () =>
  console.log('Server started at http://localhost:4000')
)

// init socket
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  path: '/socket/'
})

io.on('connection', async (socket) => {
  //  console.log("ok socket");

  socket.on('test', (data) => {
    console.log('tonga ai', data)
    io.emit('arrival-test')
  })

  socket.on('send-notif-admin', (data) => {
    io.emit('arrival-notif-admin', data)
  })

  socket.on('send-notif-user', (data) => {
    io.emit('arrival-notif-user', data)
  })
})
