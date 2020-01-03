import React, { useState } from 'react'
import Filter from './Filter'
import AddPersonForm from './AddPersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ search, setSearch ] = useState('')
  const [ searchResults, setSearchResults ] = useState(persons)

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
