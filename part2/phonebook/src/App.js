import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newPerson.name) {
        alert(`${newPerson.name} is already added to phonebook`)
        setNewPerson({
          name: '',
          number: '',
        })
        return
      }
    }

    setPersons((persons) => {
      return persons.concat(newPerson)
    })

    setNewPerson({
      name: '',
      number: '',
    })
  }

  const handlePersonChange = (event) => {
    setNewPerson((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  const changeFilter = (event) => {
    event.preventDefault()
    setFilter(() => {
      return newFilter
    })
  }

  const personsToShow = persons.filter((person) => {
    return person.name.includes(filter)
  });

  const handleFilterChange = (event) => {
    setNewFilter((prev) => {
      return event.target.value
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} changeFilter={changeFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App