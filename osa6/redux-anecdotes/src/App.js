import React from 'react';

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = ({ store }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={store} />
      <AnecdoteList store={store} />
    </div>
  )
}

export default App