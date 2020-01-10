import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, setNotification, vote }) => {

    const voteClicked = (anecdote) => {
        vote(anecdote)
        setNotification(`you voted '${anecdote.content}'`, 10)
    }

    return (
        <>
        {anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteClicked(anecdote)} />
        )}
        </>
    )
}

const filterAndSort = (anecdotes, filter) =>
    anecdotes.filter(a => !filter || a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => a.votes > b.votes ? -1 : 1)

const mapStateToProps = (state) => {
    return {
        anecdotes: filterAndSort(state.anecdotes, state.filter),
    }
}

const mapDispatchToProps = {
    vote,
    setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
