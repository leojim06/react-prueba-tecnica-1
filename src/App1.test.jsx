import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => Promise.resolve(data) }
}

describe("Star Wars App", () => {

  test("Debe obtener info del API", async () => {

    fetch.mockResolvedValue(createFetchResponse(data))

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("http://swapi.dev/api/people/");

    for (let people of data.results) {
      expect(await screen.findByText(people.name)).toBeInTheDocument();
    }
  });
});