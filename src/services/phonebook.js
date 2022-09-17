import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then((response) => response.data)
}

const save = (personObject) => {
  const request = axios.post(baseurl, personObject)
  return request.then((response) => response.data)
}

const update = (id, personObject) => {
  const request = axios.put(`${baseurl}/${id}`, personObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseurl}/${id}`)
  return request.then(response => response.data)
}

const phonebookService = { 
  getAll,
  save,
  remove,
  update,
}

export default phonebookService
