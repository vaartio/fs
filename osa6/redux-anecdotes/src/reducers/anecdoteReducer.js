import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const ACTION_NEW_ANECDOTE = 'NEW_ANECDOTE'
export const ACTION_VOTE_ANECDOTE = 'VOTE_ANECDOTE'
export const ACTION_INIT_ANECDOTE = 'INIT_NOTES'

const getId = () => (100000 * Math.random()).toFixed(0)

export const anecdoteFactory = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialAnecdotes = anecdotesAtStart.map(anecdoteFactory)

const initialState = initialAnecdotes

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_INIT_ANECDOTE:
      return action.data
    case ACTION_NEW_ANECDOTE:
      return [...state, action.data]
    case ACTION_VOTE_ANECDOTE:
      return state.map(a =>
        a.id !== action.data.id ? a : action.data
      )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: ACTION_INIT_ANECDOTE,
      data: anecdotes,
    })
  }
}

export const vote = object => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(object.id, {...object, votes: object.votes + 1 })
    dispatch({
      type: ACTION_VOTE_ANECDOTE,
      data: anecdote,
    })
  }
}

export const create = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: ACTION_NEW_ANECDOTE,
      data: anecdote,
    })
  }
}

export default anecdoteReducer
