import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ search, setSearch ] = useState('')
  const [ searchResults, setSearchResults ] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setSearchResults(response.data)
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

  const addPerson = (event) => {
    event.preventDefault()
    if (!!persons.find(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const updatedPersons = persons.concat(personObject);
    setPersons(updatedPersons)
    setNewName('')
    setNewNumber('')
    setSearch('')
    setSearchResults(updatedPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter key="search" value={search} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <AddPersonForm
        onSubmit={addPerson}
        nameValue={newName} nameOnChange={handleNewNameChange}
        numberValue={newNumber} numberOnChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons key="results" items={searchResults} />
    </div>
  )

}

export default App
