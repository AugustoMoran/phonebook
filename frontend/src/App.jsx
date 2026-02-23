import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import usePersons from './hooks/usePersons'


const App = () => {
  const { persons, message, messageType, addOrUpdatePerson, deletePerson } = usePersons()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newBusqueda, setNewBusqueda] = useState('')

  const addPerson = async (event) => {
    event.preventDefault()

    const result = await addOrUpdatePerson({
      name: newName,
      number: newNumber
    })

    if (result.ok) {
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleBusquedaChange = (event) => setNewBusqueda(event.target.value)

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(newBusqueda.toLowerCase())
  )

  return (
    <main className="app-shell">
      <section className="section-card">
        <h2>Phonebook</h2>
        <Notification message={message} messageType={messageType} />
      </section>

      <section className="section-card">
        <h2>Add new</h2>
        <PersonForm
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
        />
      </section>

      <section className="section-card">
        <Filter searchValue={newBusqueda} onSearchChange={handleBusquedaChange} />
      </section>

      <section className="section-card">
        <h2>Numbers</h2>
        <Persons persons={filteredPersons} onDelete={deletePerson} />
      </section>
    </main>
  )
}

export default App