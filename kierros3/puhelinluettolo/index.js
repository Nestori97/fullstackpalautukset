const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
morgan.token('req-body', (req) => JSON.stringify(req.body));
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  },
]
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body', { stream: process.stdout }));
app.get('/', (request, response) => {
    response.send('<h1>try page for more info /api/persons</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  app.get('/info', (request,response) => {
    const info =  persons.length
    const currentDate = new Date();
    response.send(`<p>Phonebook has info for ${info} people!</p>
    ${currentDate}`)
  })
  app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => id === person.id)
    if (person) {
            response.json(person)
          }
     else {
            response.status(404).end()
          }
  })
  app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => id !== person.id)
    if (persons.includes(person => id === person.id)) {
            response.status(404).end()
          }
     else {
            response.status(200).end()
          }
  })
  app.post('/api/persons',(request,response)=> {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      
    const body = request.body
    const randomInt = getRandomInt(10000000000000000000000000000000)
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }
      console.log(persons)
      persons.map(person =>
        {console.log(person.name, typeof person.name, body.name, typeof body.name)
           body.name === person.name})
    if(persons.some(person =>
            body.name === person.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    const person = {
        id: randomInt,
        name: body.name ,
        number: body.number,
      }
    persons = persons.concat(person)
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })