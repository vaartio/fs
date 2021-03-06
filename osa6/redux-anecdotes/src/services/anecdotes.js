import axios from 'axios'
import { anecdoteFactory } from '../reducers/anecdoteReducer'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (anecdote) => {
    const response = await axios.post(url, anecdoteFactory(anecdote))
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${url}/${id}`, newObject)
    return response.data
  }

export default { getAll, createNew, update }
