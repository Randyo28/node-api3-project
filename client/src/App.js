import './App.css'
import { useState, useEffect } from 'react'

function url(path) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:5000${path}`
    : path
}

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch(url('/api/users'))
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data)
        console.log(data)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {characters.map((character) => {
          return (
            <div key={character.id}>
              <h1>{character.name}</h1>
              <h1>{character.id}</h1>
            </div>
          )
        })}
      </header>
    </div>
  )
}

export default App
