import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, showNotification, hideNotification, vote }) => {

    const voteClicked = (anecdote) => {
        vote(anecdote.id)
        showNotification(`you voted '${anecdote.content}'`)
        setTimeout(() => {
            hideNotification()
          }, 5000)
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
    showNotification,
    hideNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
