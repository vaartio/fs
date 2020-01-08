import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    let token = null
  
    const setToken = newToken => {
        token = `bearer ${newToken}`
    }
      
    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }
      
    const create = async newObject => {
        const config = {
          headers: { Authorization: token },
        }
      
        const response = await axios.post(baseUrl, newObject, config)
        setResources([response.data])
    }
      
    const update = async (id, newObject) => {
        const response = await axios.put(`${ baseUrl } /${id}`, newObject)
        setResources([response.data])
    }
  
    const service = {
      getAll,
      create,
      update,
      setToken,
    }
  
    return [
      resources, service
    ]
}
