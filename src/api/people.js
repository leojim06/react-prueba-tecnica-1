export async function getPeople() {
    try {
        const response = await fetch("http://swapi.dev/api/people/");
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getPerson(id = 1) {
    const response = await fetch(`http://swapi.dev/api/people/${id}/`)
    const data = await response.json();
    return data;
}

class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}