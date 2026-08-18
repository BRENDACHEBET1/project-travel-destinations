import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";

// Import the function that gets countries from our API service
import { getCountries } from "../services/CountriesApi";

function Destinations() {
  // Get the search value from the URL
  // Example: /destinations?search=Kenya
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  // Store the user's search term
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Store the countries returned by the API
  const [countries, setCountries] = useState([]);

  // Keep track of whether the API is loading
  const [loading, setLoading] = useState(true);

  // Store any API error
  const [error, setError] = useState("");

  // Fetch countries when the page loads
  useEffect(() => {
    getCountries()
      .then((data) => {
  console.log("Countries from API:", data);

  setCountries(data);
  setLoading(false);
})
      .catch((error) => {
        // Save the error message
        setError(error.message);

        // Loading is finished
        setLoading(false);
      });
  }, []);

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
  country.names?.common
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase())
);
console.log("Search term:", searchTerm);
console.log("Countries:", countries.length);
console.log("Filtered countries:", filteredCountries.length);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Page heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Explore Countries
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Choose a country and discover amazing tourist destinations,
              cultures, and places to visit.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          {/* Display loading message while fetching countries */}
          {loading && (
            <p className="mt-10 text-center text-gray-600">
              Loading countries...
            </p>
          )}

          {/* Display error message if the API request fails */}
          {error && (
            <p className="mt-10 text-center text-red-600">
              {error}
            </p>
          )}

          {/* Display countries after loading */}
          {!loading && !error && (
            <section className="mt-10">

              {/* Check whether any countries match the search */}
              {filteredCountries.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                  {/* Create a card for every matching country */}
                  {filteredCountries.map((country) => (
                    <DestinationCard
                      key={country.codes.alpha_3 || country.uuid}
                      destination={country}
                    />
                  ))}

                </div>
              ) : (
                /* Display this when no country matches */
                <div className="py-12 text-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    No countries found
                  </h2>

                  <p className="mt-2 text-gray-600">
                    Try searching for another country.
                  </p>
                </div>
              )}

            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default Destinations;