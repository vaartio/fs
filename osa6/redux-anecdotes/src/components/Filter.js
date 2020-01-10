import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    event.preventDefault()
    store.dispatch(filterChange(event.target.value))
}
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
