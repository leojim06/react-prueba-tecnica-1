import { render, screen } from '@testing-library/react'
import App from './App'

describe("Star Wars App", () => {
    test("Debe mostrarse una lista de personajes incluido Luke Skywalker", () => {
        render(<App />);
        var personaje = screen.getByText("Luke Skywalker");
        expect(personaje).toBeInTheDocument();
    });
});


// https://jestjs.io/docs/expect
// https://testing-library.com/docs/queries/about/#textmatch
// https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd
// https://medium.com/@masbagaspn/unit-testing-react-application-with-vitest-and-react-testing-library-910f6f4dc675