import "./SearchBar.css";

interface Props {
  query: string;
  setQuery: (query: string) => void;
  setIsSuggestionBoxOpen: (isOpen: boolean) => void;
  handleQueryChange: (query: string) => void;
}

export function SearchBar({
  query,
  setQuery,
  setIsSuggestionBoxOpen,
  handleQueryChange,
}: Props) {
  return (
    <label className="SearchBarContainer">
      <input
        type="text"
        placeholder="Ex: Charmander🔥"
        onChange={(event) => handleQueryChange(event.target.value)}
        className="SearchBar"
        value={query}
      />
      <button
        onClick={() => {
          setQuery("");
          setIsSuggestionBoxOpen(false);
        }}
      >
        Clear
      </button>
    </label>
  );
}
