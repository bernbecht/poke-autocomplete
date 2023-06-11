import { useState } from "react";
import "./App.css";
import { SuggestionsBox } from "./components/SuggestionBox/SuggestionsBox";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { useFetchPokemonSuggestions } from "./data/useFetchPokemonSuggestions";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] =
    useState<boolean>(false);
  const {
    isLoading,
    data: pokemons,
    error,
    fetch,
  } = useFetchPokemonSuggestions();

  function handleSuggestionClick(selectedPokemon: string) {
    setQuery(selectedPokemon);
    setIsSuggestionBoxOpen(false);
  }

  async function handleQueryChange(query: string) {
    await fetch(query);
    setQuery(query);
    setIsSuggestionBoxOpen(true);
  }

  if (error) {
    return (
      <p>☹️ Our system isn't available right now. Please try again later</p>
    );
  }

  const clearButton = query ? (
    <button
      onClick={() => {
        setQuery("");
        setIsSuggestionBoxOpen(false);
      }}
    >
      Clear
    </button>
  ) : null;

  return (
    <div>
      <h1>Search a Pokemon</h1>
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange}
        clearButton={clearButton}
      />
      <SuggestionsBox
        query={query}
        open={isSuggestionBoxOpen}
        items={pokemons}
        handleItemClick={handleSuggestionClick}
        loading={isLoading}
      />
    </div>
  );
}

export default App;
