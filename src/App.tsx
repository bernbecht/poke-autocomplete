import { useState } from "react";
import "./App.css";
import { SuggestionsBox } from "./components/SuggestionBox/SuggestionsBox";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { useFetchPokemons } from "./data/useFetchPokemons";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] =
    useState<boolean>(false);
  const { isLoading, data: pokemons, error } = useFetchPokemons();
  const filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.toLocaleLowerCase().startsWith(query);
  });

  function handleSuggestionClick(selectedPokemon: string) {
    setQuery(selectedPokemon);
    setIsSuggestionBoxOpen(false);
  }

  function handleQueryChange(query: string) {
    setQuery(query.toLocaleLowerCase());
    setIsSuggestionBoxOpen(true);
  }

  if (error) {
    return (
      <p>☹️ Our system isn't available right now. Please try again later</p>
    );
  }

  const mainMarkup = isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Search a Pokemon</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        setIsSuggestionBoxOpen={setIsSuggestionBoxOpen}
        handleQueryChange={handleQueryChange}
      />
      <SuggestionsBox
        query={query}
        open={isSuggestionBoxOpen}
        items={filteredPokemons}
        handleItemClick={handleSuggestionClick}
      />
    </div>
  );
  return <div>{mainMarkup}</div>;
}

export default App;
