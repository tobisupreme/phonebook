import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

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

// refactored code to render DisplaySingle directly from App because of button event
const DisplaySingle = ({ person, onClick }) => {
  return (
    <div key={person.id} >
      <span>{person.name}</span>{' '}
      <span>{person.number}</span>{' '}
      <button onClick={onClick}>delete</button>
      <br />
    </div>
  )
}

/* 
const Persons = ({ data }) => {
  return (
    <div>
      {data.map((person) => {
        return (
          <>
            <button>❌</button>{' '}
            <DisplaySingle key={person.name} person={person} />
          </>
        )
      })}
    </div>
  )
} 
*/

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState({ isEmpty: true, query: '' })

  // handle delete
  const removeName = id => {
    const person = persons.find(p => {
      return p.id === id
    })

    if (!window.confirm(`Delete ${person.name}?`)) return

    phonebookService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        alert('Delete successful ✅')
      })
      .catch(err => {
        alert('Operation unsuccessful! ❌')
      })
  }

  // handle save
  const saveNewName = (personObject) => {
    phonebookService
    .save(personObject)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
    .catch(err => {
      alert('❌ Sorry, an error occured')
    })
  }

  const saveUpdatedName = (id, personObject) => {
    phonebookService
    .update(id, personObject)
    .then(response => {
      // console.log("🚀 ~ response", response)
      const updatedPersons = (persons.map((person) => {
        return person.id !== response.id ? person : response
      }))
      setPersons(updatedPersons)
      setNewName('')
      setNewNumber('')
    })
    .catch(err => {
      alert('❌ Sorry, an error occured')
    })
  }

  const saveName = (e) => {
    e.preventDefault()
    // check for duplicate
    let action = 'save'
    const check = checkIfExists()

    if (check) {
      const prompt = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      if (!prompt) return
      action = 'update'
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    switch (action) {
      case 'save':
        saveNewName(newPerson)
        break

      case 'update':
        saveUpdatedName(check.id, newPerson)
        break

      default:
        break
    }

  }

  // get entries from db
  const hook = () => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])

  // filter displayed entries
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
      return check
    }

    return null
  }

  const dataToShow = searchQuery.isEmpty ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchQuery.query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={filterListing} />

      <Form saveName={saveName} newName={newName} newNumber={newNumber} onSubmit={saveName} onNewName={handleNewName} onNewNumber={handleNewNumber} />

      {dataToShow.map((person) => {
        return (
          <div key={person.id}>
            <DisplaySingle person={person} onClick={() => removeName(person.id)} />
          </div>
        )
      })}    
    </div>
  )
}

export default App
