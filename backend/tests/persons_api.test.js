const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Person = require('../models/person')
const helper = require('./test_helper')

const api = supertest(app)

describe('phonebook api', () => {
  beforeEach(async () => {
    await Person.deleteMany({})
    await Person.insertMany(helper.initialPersons)
  })

  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all initial persons are returned', async () => {
    const response = await api.get('/api/persons')
    assert.strictEqual(response.body.length, helper.initialPersons.length)
  })

  test('a valid person can be added', async () => {
    const newPerson = {
      name: 'Linus Torvalds',
      number: '050-11223344'
    }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length + 1)

    const names = personsAtEnd.map(p => p.name)
    assert(names.includes(newPerson.name))
  })

  test('adding a person fails when name is missing', async () => {
    const invalidPerson = {
      number: '050-11223344'
    }

    await api
      .post('/api/persons')
      .send(invalidPerson)
      .expect(400)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
  })

  test('adding a person fails when number format is invalid', async () => {
    const invalidPerson = {
      name: 'Invalid Number',
      number: '123456789'
    }

    await api
      .post('/api/persons')
      .send(invalidPerson)
      .expect(400)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
  })

  test('adding a person fails when name already exists', async () => {
    const duplicate = {
      name: 'Arto Hellas',
      number: '050-99999999'
    }

    await api
      .post('/api/persons')
      .send(duplicate)
      .expect(400)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
  })

  test('a person can be deleted', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToDelete = personsAtStart[0]

    await api
      .delete(`/api/persons/${personToDelete.id}`)
      .expect(204)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length - 1)

    const ids = personsAtEnd.map(p => p.id)
    assert(!ids.includes(personToDelete.id))
  })
})

after(async () => {
  await mongoose.connection.close()
})
