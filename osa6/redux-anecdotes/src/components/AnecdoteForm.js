import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ create }) => {
    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        create(content)
    }
    return (
        <form onSubmit={createAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default connect(null, { create })(AnecdoteForm)
