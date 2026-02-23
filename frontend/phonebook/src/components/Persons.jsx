import React from 'react'
import Person from './Person'

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map(person => (
        <div key={person.id}>
          <Person person={person}/>
          <button onClick={() => onDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons
