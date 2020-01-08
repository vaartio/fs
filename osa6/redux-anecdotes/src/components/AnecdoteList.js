import React from 'react'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    return (
        <>
        {store.getState().sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => store.dispatch(vote(anecdote.id))} />
        )}
        </>
    )
}

export default AnecdoteList
