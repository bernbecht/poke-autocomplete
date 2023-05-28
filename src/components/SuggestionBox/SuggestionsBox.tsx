import { Pokemon } from "../../types";
import { capitalizeFirstLetter } from "../../utils";
import "./SuggestionBox.css";

interface Props {
  query: string;
  open: boolean;
  items: Pokemon[];
  loading?: boolean;
  handleItemClick: (selectedItem: string) => void;
}

export function SuggestionsBox({
  query,
  open,
  items,
  loading = false,
  handleItemClick,
}: Props) {
  if (query === "" || !open) {
    return null;
  }

  const suggestionItems =
    items.length === 0 ? (
      <p>No results</p>
    ) : (
      items.map((pokemon) => {
        const matchedLetters = pokemon.name.slice(0, query.length);
        const remainingLetters = pokemon.name.slice(query.length);
        return (
          <li
            tabIndex={0}
            className="SuggestionItem"
            key={pokemon.url}
            onClick={(event) =>
              handleItemClick(event.currentTarget.textContent || "")
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleItemClick(event.currentTarget.textContent || "");
              }
            }}
          >
            <mark>{capitalizeFirstLetter(matchedLetters)}</mark>
            {remainingLetters}
          </li>
        );
      })
    );

  return (
    <ul className="SuggestionBox">
      {loading ? <p>Loading...</p> : suggestionItems}
    </ul>
  );
}
