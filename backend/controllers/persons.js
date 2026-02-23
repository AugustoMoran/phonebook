const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

personsRouter.get('/:id', async (request, response) => {
  const person = await Person.findById(request.params.id)

  if (person) {
    return response.json(person)
  }

  return response.status(404).end()
})

personsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  const savedPerson = await person.save()
  response.status(201).json(savedPerson)
})

personsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  const updatedPerson = await Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )

  if (!updatedPerson) {
    return response.status(404).end()
  }

  response.json(updatedPerson)
})

personsRouter.delete('/:id', async (request, response) => {
  await Person.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = personsRouter
