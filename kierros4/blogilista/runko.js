const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger.js')
mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})