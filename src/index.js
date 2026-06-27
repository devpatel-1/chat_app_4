const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

require('./db/mongoose')

const Message = require('./models/message')
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/messages')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
})

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/health', (req, res) => {
    res.send('GatherIn backend is running')
})

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', async (options, callback) => {
        const { error, user } = addUser({
            id: socket.id,
            ...options
        })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        const oldMessages = await Message.find({
            room: user.room
        }).sort({
            createdAt: 1
        }).limit(50)

        oldMessages.forEach((oldMessage) => {
            if (oldMessage.type === 'text') {
                socket.emit('message', oldMessage)
            }

            if (oldMessage.type === 'location') {
                socket.emit('locationMessage', oldMessage)
            }
        })

        socket.emit(
            'message',
            generateMessage('Admin', 'Welcome!')
        )

        socket.broadcast.to(user.room).emit(
            'message',
            generateMessage('Admin', `${user.username} has joined!`)
        )

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', async (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (!user) {
            return callback('User not found')
        }

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        const chatMessage = generateMessage(
            user.username,
            message
        )

        await Message.create({
            username: chatMessage.username,
            text: chatMessage.text,
            room: user.room,
            type: 'text',
            createdAt: chatMessage.createdAt
        })

        io.to(user.room).emit('message', chatMessage)

        callback()
    })

    socket.on('sendLocation', async (coords, callback) => {
        const user = getUser(socket.id)

        if (!user) {
            return callback('User not found')
        }

        const locationMessage = generateLocationMessage(
            user.username,
            `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        )

        await Message.create({
            username: locationMessage.username,
            url: locationMessage.url,
            room: user.room,
            type: 'location',
            createdAt: locationMessage.createdAt
        })

        io.to(user.room).emit(
            'locationMessage',
            locationMessage
        )

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit(
                'message',
                generateMessage('Admin', `${user.username} has left!`)
            )

            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})