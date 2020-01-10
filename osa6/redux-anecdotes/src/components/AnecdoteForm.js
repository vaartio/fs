import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ create }) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        const newOne = event.target.anecdote.value
        event.target.anecdote.value = ''
        create(newOne)
    }
    return (
        <form onSubmit={createAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = {
    create,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
