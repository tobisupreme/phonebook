import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ onChange }) => {
  return (
    <div>
      filter shown with <input onChange={onChange} />
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.saveName}>
      <h2>Add new entry</h2>
      <div>
        name: <input value={props.newName} onChange={props.onNewName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.onNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      <h2>Numbers</h2>
    </form>
  )
}

const DisplaySingle = ({ person }) => {
  return (
    <>
      <span>{person.name}</span> <span>{person.number}</span>
      <br />
    </>
  )
}

const Persons = ({ data }) => {
  return (
    <div>
      {data.map((person) => {
        return <DisplaySingle key={person.name} person={person} />
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState({ isEmpty: true, query: '' })

  const saveName = (e) => {
    e.preventDefault()
    // check for duplicate
    const check = checkIfExists()

    if (check) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        alert('❌ Sorry, an error occured')
      })
  }

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const filterListing = (e) => {
    const len = e.target.value.length
    if (len === 0) {
      searchQuery.isEmpty = true
    } else {
      searchQuery.isEmpty = false
    }

    const updateQuery = e.target.value
    setSearchQuery({ ...searchQuery, query: updateQuery })
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const checkIfExists = () => {
    const check = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (check) {
      return true
    }

    return false
  }

  const dataToShow = searchQuery.isEmpty ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchQuery.query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={filterListing} />

      <Form saveName={saveName} newName={newName} newNumber={newNumber} onSubmit={saveName} onNewName={handleNewName} onNewNumber={handleNewNumber} />

      <Persons data={dataToShow} />
    </div>
  )
}

export default App
