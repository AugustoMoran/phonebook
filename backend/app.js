const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const personsRouter = require('./controllers/persons')
const Person = require('./models/person')
const testingRouter = require('./controllers/testing')

const app = express()

logger.info('Conectando a MongoDB...')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('✅ Conectado a MongoDB')
  })
  .catch((error) => {
    logger.error('❌ Error conectando a MongoDB:', error.message)
  })

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

app.get('/info', async (request, response) => {
  const count = await Person.countDocuments({})
  const currentTime = new Date()

  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentTime}</p>
  `)
})

app.use('/api/persons', personsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
