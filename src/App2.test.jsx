import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe.todo("Star Wars App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Debe obtener info del API", async () => {
    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(data),
      });
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("http://swapi.dev/api/people/");

    for (let people of data.results) {
      expect(await screen.findByText(people.name)).toBeInTheDocument();
    }
  });
});

// https://jestjs.io/docs/expect
// https://testing-library.com/docs/queries/about/#textmatch
// https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd
// https://medium.com/@masbagaspn/unit-testing-react-application-with-vitest-and-react-testing-library-910f6f4dc675
// https://kentcdodds.com/blog/stop-mocking-fetch
