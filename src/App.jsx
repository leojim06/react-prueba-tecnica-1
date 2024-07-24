import { useState, useEffect } from "react";
import "./App.css";
import { getPeople, getPerson } from "./api/people";

function App() {
  const [people, setPeople] = useState([]);
  const [currentPerson, setCurrentPerson] = useState(1);
  const [details, setDetails] = useState({});
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data.results))
      .catch(handleError);
  }, []);

  useEffect(() => {
    getPerson(currentPerson).then(setDetails).catch(handleError);
  }, [currentPerson]);

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  const showDetails = (person) => {
    const id = Number(person.url.split("/").slice(-2)[0]);
    setCurrentPerson(id);
  };

  return (
    <>
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people.map((person) => (
          <li key={person.name} onClick={() => showDetails(person)}>
            {person.name}
          </li>
        ))}
      </ul>
      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>height: {details.height}</li>
            <li>mass: {details.mass}</li>
            <li>birth year: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default App;
