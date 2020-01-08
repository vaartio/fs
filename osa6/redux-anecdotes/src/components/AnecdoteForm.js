import React from 'react'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        const newOne = event.target.anecdote.value
        event.target.anecdote.value = ''
        store.dispatch(create(newOne))
    }
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
        </>
    )
}

export default AnecdoteForm
