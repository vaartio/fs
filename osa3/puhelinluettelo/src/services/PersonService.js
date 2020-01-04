import axios from 'axios'
const baseUrl = '/api/persons'

const getBiggestId = entries => {
    return entries.reduce((prev, cur) => !prev || cur.id > prev.id ? cur.id : prev.id)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = getAll()
    .then(entries => {
        newObject.id = getBiggestId(entries) + 1
        return newObject
    })
    .then(newObj => axios.post(baseUrl, newObj))
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }
