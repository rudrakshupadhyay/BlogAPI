import styles from "./searchBar.module.css";
import { useState } from "react";

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search posts by title..."
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className={styles.searchButton}
        onClick={() => handleSearch(query)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
