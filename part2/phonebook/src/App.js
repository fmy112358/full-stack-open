import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({
    content: '',
    type: '',
  })

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
        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(person.id, newPerson)
            .then(() => {
              refreshPersons()
              setMessage({ content: `Changed ${newPerson.name}'s number`, type: 'hint' })
              setNewPerson({
                name: '',
                number: '',
              })
              setTimeout(() => {
                setMessage({ content: '', type: '' })
              }, 2000);
            })
            .catch((error) => {
              setMessage({ content: `Information of ${newPerson.name} was already removed from server`, type: 'error' })
              setTimeout(() => {
                setMessage({ content: '', type: '' })
              }, 2000);
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
        setMessage({ content: `Added ${newPerson.name}`, type: 'hint' })
        setNewPerson({
          name: '',
          number: '',
        })
        setTimeout(() => {
          setMessage({ content: '', type: '' })
        }, 2000);
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
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  const handleFilterChange = (event) => {
    setNewFilter(() => {
      return event.target.value
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} type={message.type} />
      <Filter newFilter={newFilter} changeFilter={changeFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App