const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    room: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    text: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'location']
    },
    createdAt: {
        type: Number,
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message