const express = require('express')
var morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('req-body', (req) => JSON.stringify(req.body))
let persons = []
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body', { stream: process.stdout }))
app.get('/', (request, response) => {
  response.send('<h1>try page for more info /api/persons</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})
app.get('/info', async (request, response,next) => {
  const currentDate = new Date()
  Person.countDocuments({}).then(count => response.send(`<p>Phonebook has info ${count} for people!</p>${currentDate}`))
    .catch(error => next(error))
})


app.get('/api/persons/:id',(request,response,next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})
app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id',(request,response,next) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => id !== person.id)
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.post('/api/persons',(request,response,next) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const body = request.body
  const randomInt = getRandomInt(10000000000000000000000000000000)
  if (!body.name || !body.number) {
    return next({ status: 400, message: 'name or number missing' })
  }
  if(persons.some(person =>
    body.name === person.name)){
    return next({ status: 400, message: 'name must be unique' })
  }
  const person = new Person({
    id: randomInt,
    name: body.name ,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  if (error.status) {
    return response.status(error.status).json({ error: error.message })
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})