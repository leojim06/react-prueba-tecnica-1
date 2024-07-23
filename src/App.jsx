import './App.css'
import data from './data.json'

function App() {
  return (
    <>
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
