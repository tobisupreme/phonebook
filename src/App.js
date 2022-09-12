import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'tobisupreme' }])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <h2>Numbers</h2>
      </form>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App
