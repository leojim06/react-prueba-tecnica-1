import { useState, useEffect } from "react";
import "./App.css";
import { getPeople } from "./api/people";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results));
  }, []);

  return (
    <>
      <ul>
        {people.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;