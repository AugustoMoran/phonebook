import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newBusqueda, setNewBusqueda] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        // don't show a notification on initial load
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName)

    if (!existingPerson) {
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          // show a notification for 5 seconds when a new person is added
          setMessage(`Added ${response.data.name}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
        .catch(error => console.error('Error creating person:', error))

      return
    }


    const seguro = window.confirm(
      `${newName} ya está en la agenda. ¿Desea reemplazar el número?`
    )

    if (!seguro) {
      console.log("Actualización cancelada")
      return
    }

    personService
      .update(existingPerson.id, { ...existingPerson, number: newNumber })
      .then(response => {
        setPersons(persons.map(
          p => p.id !== existingPerson.id ? p : response.data
        ))
        setNewName('')
        setNewNumber('')
        setMessage(`edited ${response.data.name}`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
      .catch(error => {
        console.error("Error updating:", error)
        setMessage(`Error updating ${existingPerson.name}`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
  }


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleBusquedaChange = (event) => setNewBusqueda(event.target.value)

  const deletePerson = (id) => {
    const seguro = window.confirm('seguro desea eliminar el contacto')
    if (seguro) {
      console.log('Deleting person with id:', id)
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
        })
    } else {
      console.log('usuario cancelo la eliminacion')
    }
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(newBusqueda.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <Filter searchValue={newBusqueda} onSearchChange={handleBusquedaChange} />

      <h2>Numbers (filtered)</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />


      <h2>All contacts</h2>
      <Persons persons={persons} onDelete={deletePerson} />
    </div>
  )
}

export default App