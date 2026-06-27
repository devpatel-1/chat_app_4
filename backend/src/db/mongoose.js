const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message)
    })