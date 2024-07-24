import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { ok: true, json: () => Promise.resolve(data) }
}

describe("Star Wars App", () => {

  test("Debe obtener info del API", async () => {

    fetch.mockResolvedValue(createFetchResponse(data))

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith("http://swapi.dev/api/people/");

    for (let people of data.results) {
      expect(await screen.findByText(people.name)).toBeInTheDocument();
    }
  });

    test("Debe mostrar un error cuando exista un error de red", async () => {
      vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network error"));

      render(<App />);
      expect(await screen.findByText("Network error")).toBeInTheDocument();
    });
});