import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'
import Country from './Country'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const onItemClick = (name) => {
    return () => {
      setSearch(name)
    }
  }

  const Search = (props) => {
    const results = countries.filter(item => item.name.toLowerCase().includes(props.query.toLowerCase()))
    if (results.length > 10) {
      return 'Too many matches, specify another filter'
    }
    else if (results.length > 1) {
      return (<Countries key="results" items={results} onItemClick={onItemClick} />)
    }
    else if (results.length === 1) {
      return (<Country key="result" details={results[0]} />)
    }
    else {
      return 'No matches found'
    }
  }

  return (
    <div>
      <h2>Country information service</h2>
      <Filter key="search" value={search} onChange={handleSearchChange} />
      <h3>Results</h3>
      <Search key="searchResults" query={search} />
    </div>
  )

}

export default App
