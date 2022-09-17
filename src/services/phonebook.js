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

const remove = (id) => {
  const request = axios.delete(`${baseurl}/${id}`)
  return request.then(response => response.data)
}

const phonebookService = { 
  getAll,
  save,
  remove,
}

export default phonebookService
