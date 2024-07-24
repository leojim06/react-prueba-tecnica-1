import { describe, test, expect, beforeEach, vi, act } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe("Star Wars App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Debe obtener info del API", async () => {
    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      });
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith("http://swapi.dev/api/people/");

    for (let people of data.results) {
      expect(await screen.findByText(people.name)).toBeInTheDocument();
    }
  });
});