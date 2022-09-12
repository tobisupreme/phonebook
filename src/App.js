import { useState } from 'react'

const DisplaySingle = ({ person }) => {
  return (
    <>
      <span>{person.name}</span> <span>{person.number}</span>
      <br />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState({ isEmpty: true, query: '' })

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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const dataToShow = searchQuery.isEmpty ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchQuery.query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={filterListing} />
      </div>
      <form onSubmit={saveName}>
        <h2>Add new entry</h2>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <h2>Numbers</h2>
      </form>

      <div>
        {dataToShow.map((person) => {
          return <DisplaySingle key={person.name} person={person} />
        })}
      </div>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App
