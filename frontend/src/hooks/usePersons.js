import { useEffect, useState } from 'react'
import personService from '../services/persons'

const usePersons = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const showNotification = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const getErrorMessage = (error, fallback) => {
    return error?.response?.data?.error || fallback
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
        showNotification(getErrorMessage(error, 'Error fetching persons'), 'error')
      })
  }, [])

  const addOrUpdatePerson = async ({ name, number }) => {
    const existingPerson = persons.find(p => p.name === name)

    if (!existingPerson) {
      try {
        const response = await personService.create({ name, number })
        setPersons(prevPersons => prevPersons.concat(response.data))
        showNotification(`Added ${response.data.name}`)
        return { ok: true, action: 'created' }
      } catch (error) {
        console.error('Error creating person:', error)
        showNotification(getErrorMessage(error, 'Error creating person'), 'error')
        return { ok: false, action: 'create_failed' }
      }
    }

    const confirmReplace = window.confirm(
      `${name} ya está en la agenda. ¿Desea reemplazar el número?`
    )

    if (!confirmReplace) {
      return { ok: false, action: 'cancelled' }
    }

    try {
      const response = await personService.update(existingPerson.id, {
        ...existingPerson,
        number
      })

      setPersons(prevPersons => prevPersons.map(
        p => p.id !== existingPerson.id ? p : response.data
      ))
      showNotification(`Edited ${response.data.name}`)
      return { ok: true, action: 'updated' }
    } catch (error) {
      console.error('Error updating:', error)

      if (error?.response?.status === 404) {
        setPersons(prevPersons => prevPersons.filter(p => p.id !== existingPerson.id))
        showNotification(
          `Information of ${existingPerson.name} has already been removed from server`,
          'error'
        )
        return { ok: false, action: 'stale_removed' }
      }

      showNotification(getErrorMessage(error, `Error updating ${existingPerson.name}`), 'error')
      return { ok: false, action: 'update_failed' }
    }
  }

  const deletePerson = async (id) => {
    const confirmDelete = window.confirm('seguro desea eliminar el contacto')
    if (!confirmDelete) {
      return { ok: false, action: 'cancelled' }
    }

    try {
      await personService.deletePerson(id)
      setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
      showNotification('Contact removed')
      return { ok: true, action: 'deleted' }
    } catch (error) {
      console.error('Error deleting person:', error)

      if (error?.response?.status === 404) {
        setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        showNotification('This contact was already removed from server', 'error')
        return { ok: false, action: 'already_deleted' }
      }

      showNotification(getErrorMessage(error, 'Error deleting person'), 'error')
      return { ok: false, action: 'delete_failed' }
    }
  }

  return {
    persons,
    message,
    messageType,
    addOrUpdatePerson,
    deletePerson
  }
}

export default usePersons
