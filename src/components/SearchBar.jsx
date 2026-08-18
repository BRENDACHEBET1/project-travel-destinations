import { useState } from "react";

function SearchBar() {

  // Stores whatever the user types into the search input
  const [search, setSearch] = useState("");

  // Runs when the user submits the search form
  const handleSubmit = (e) => {

    // Prevents the browser from refreshing the page
    e.preventDefault();

    // For now, just display the search value in the console
    // Later, we'll use this value to search the API
    console.log("Searching for:", search);
  };

  return (
    // Search form
    <form
      onSubmit={handleSubmit}
      className="flex w-full overflow-hidden rounded-xl bg-white shadow-lg"
    >

      {/* Search input */}
      <input
        type="text"

        // The input displays the current search value
        value={search}

        // Updates the search state whenever the user types
        onChange={(e) => setSearch(e.target.value)}

        placeholder="Search for a country..."

        className="min-w-0 flex-1 px-5 py-4 text-gray-900 outline-none placeholder:text-gray-400"
      />

      {/* Search button */}
      <button
        type="submit"
        className="bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;