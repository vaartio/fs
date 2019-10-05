import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h2>{title}</h2>

const Anecdote = ({ value }) => <div>{ value }</div> 

const Button = ({ label, handler }) => <button onClick={handler} >{ label }</button>

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(anecdotes.map(item => 0))

  const getNext = (current, max) => {
      let next;
      while (!next || next === current) {
          next = Math.floor(Math.random() * Math.floor(max));
      }
      return next;
  }

  const nextAnecdote = () => {
      const next = getNext(selected, anecdotes.length);
      return setSelected(next)
  }

  const vote = (votedItem, state) => () => {
      const newVotes = [...state];
      newVotes[votedItem] += 1
      setVote(newVotes)
  }

  const getMostVoted = (anecdotes, votes) => {
      if (Math.max(...votes) === 0) {
          return "No votes yet"
      }
      const index = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      return anecdotes[index]
  }

  return (
    <div>
        <Header title="Anecdote of the day" />
        <Anecdote value={anecdotes[selected]} />
        <Button label="vote" handler={vote(selected, votes)} />
        <Button label="next anecdote" handler={nextAnecdote} />
        <Header title="Anecdote with most votes" />
        <Anecdote value={getMostVoted(anecdotes, votes)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
