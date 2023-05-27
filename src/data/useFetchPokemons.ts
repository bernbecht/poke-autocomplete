import { useState, useEffect } from "react";
import { Pokemon } from "../types";

async function GET(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`);
  }
  return await response.json();
}

async function fetchPokemons() {
  const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const response = await GET(apiURL);
  return response;
}

export function useFetchPokemons() {
  // in a bigger app, we should move the loading state to a global state management library like redux
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchPokemons();
        setData(data.results);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  return { isLoading, data, error };
}
