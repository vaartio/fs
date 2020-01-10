import React from 'react'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const { anecdotes, filter } = store.getState()

    const voteClicked = (anecdote) => {
        store.dispatch(vote(anecdote.id))
        store.dispatch(showNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            store.dispatch(hideNotification())
          }, 5000)
    }

    return (
        <>
        {anecdotes.filter(a => !filter || a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteClicked(anecdote)} />
        )}
        </>
    )
}

export default AnecdoteList
