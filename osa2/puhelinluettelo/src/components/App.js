import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import Persons from './Persons'
import personService from '../services/PersonService'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ search, setSearch ] = useState('')
  const [ searchResults, setSearchResults ] = useState(persons)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(results => {
        console.log('promise fulfilled')
        setPersons(results)
        setSearchResults(results)
      })
  }, [])

  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setSearchResults(persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const setNotification = (message, type = 'info') => {
    setMessage({
      message: message,
      type: type,
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let item = persons.find(item => item.name === newName)
    if (!!item) {
      if (item.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService.update(item.id, { ...item, number: newNumber })
            .then((result) => {
              setNotification(`Updated ${result.name}`)
              personService.getAll()
                .then(results => {
                  setPersons(results)
                  setSearchResults(results)
                })
            })
        }
      }
      else {
        alert(`${newName} is already added to phonebook`)
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject)
      .then(storedPersonObject => {
        setNotification(`Created ${storedPersonObject.name}`)
        const updatedPersons = persons.concat(storedPersonObject);
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
        setSearch('')
        setSearchResults(updatedPersons)
      })
  }

  const onItemClick = (item) => {
    return () => {
      if (window.confirm(`Delete ${item.name}?`)) {
        personService.remove(item.id)
          .then(() => {
            setNotification(`Deleted ${item.name}`)
            personService.getAll()
              .then(results => {
                setPersons(results)
                setSearchResults(results)
              })
          })
          .catch(error => {
            setNotification(`Information of ${item.name} has already been removed from server`, 'error')
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter key="search" value={search} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <AddPersonForm
        onSubmit={addPerson}
        nameValue={newName} nameOnChange={handleNewNameChange}
        numberValue={newNumber} numberOnChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons key="results" items={searchResults} onItemClick={onItemClick} />
    </div>
  )

}

export default App
