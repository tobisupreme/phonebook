import { useState } from 'react'

const Display = ({ name }) => {
  return (
    <>
      <span>{name}</span>
      <br />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const saveName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
    }
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={saveName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <h2>Numbers</h2>
      </form>

      <div>
        {persons.map((person) => {
          return <Display key={person.name} name={person.name} />
        })}
      </div>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App
