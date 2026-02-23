const Person = require('../models/person')

const initialPersons = [
  {
    name: 'Arto Hellas',
    number: '040-1234567'
  },
  {
    name: 'Ada Lovelace',
    number: '09-1234556'
  }
]

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map(person => person.toJSON())
}

module.exports = {
  initialPersons,
  personsInDb
}
