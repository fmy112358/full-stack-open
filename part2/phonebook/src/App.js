import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    refreshPersons()
  }, [])

  const refreshPersons = () => {
    personService
      .getAll()
      .then((returnedPerons) => {
        return setPersons(returnedPerons)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newPerson.name) {
        if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          personService
            .update(person.id, newPerson)
            .then(() => {
              refreshPersons()
              setNewPerson({
                name: '',
                number: '',
              })
            })
          return
        }
      }
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons((persons) => {
          return persons.concat(returnedPerson)
        })
        setNewPerson({
          name: '',
          number: '',
        })
      })
  }

  const deletePerson = (event, id) => {
    event.preventDefault()
    if (window.confirm(`Delete ${persons.filter(person => { return person.id === id })[0].name}?`)) {
      personService
        .destroy(id)
        .then(() => {
          refreshPersons()
        })
    }
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
    setNewFilter(() => {
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App