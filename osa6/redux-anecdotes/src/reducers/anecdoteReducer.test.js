import deepFreeze from 'deep-freeze'
import anecdoteReducer, { initialAnecdotes, anecdoteFactory, ACTION_NEW_ANECDOTE, ACTION_VOTE_ANECDOTE} from './anecdoteReducer'

describe('anecdote reducer', () => {
  const initialState = initialAnecdotes

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('anecdote is voted', () => {
    const action = {
      type: ACTION_VOTE_ANECDOTE,
      data: { id: initialState[0].id }
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState[0].votes).toEqual(initialState[0].votes + 1)
  })

  test('anecdote is created and voted', () => {
    const newAnecdote = anecdoteFactory('Life is like a box of chocolate')
    const action = {
      type: ACTION_NEW_ANECDOTE,
      data: newAnecdote
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    const added = newState.find(anecdote => anecdote.id === newAnecdote.id)

    const voteAction = {
        type: ACTION_VOTE_ANECDOTE,
        data: { id: added.id }
    }
    const newState2 = anecdoteReducer(newState, voteAction)
    const voted = newState2.find(anecdote => anecdote.id === added.id)
    expect(voted.votes).toEqual(1)
    expect(voted.content).toBe('Life is like a box of chocolate')
  })
})
