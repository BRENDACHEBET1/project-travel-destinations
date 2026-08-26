import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import DestinationCard from "../components/DestinationCard";
import { getCountries } from "../api/countries";
import { getDestinations } from "../api/backend";

function Destinations() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [featuredError, setFeaturedError] = useState("");

  function loadCountries() {
    setLoading(true);
    setError("");
    getCountries()
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCountries()
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getDestinations()
      .then((data) => setFeaturedDestinations(data))
      .catch((err) => setFeaturedError(err.message));
  }, []);

  // Only show countries that match the search box and the region filter
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.names?.common
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || country.region === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-center text-4xl font-bold text-gray-900">Explore Countries</h1>

        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mt-6">
          <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>

        {featuredDestinations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Featured destinations</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDestinations.map((destination) => (
                <article key={destination.id} className="overflow-hidden rounded-xl bg-white shadow">
                  {destination.image_url ? (
                    <img
                      src={destination.image_url}
                      alt={destination.name}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 bg-slate-200" />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{destination.name}</h3>
                    {destination.description && (
                      <p className="mt-2 text-sm text-gray-600">{destination.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {featuredError && (
          <p className="mt-8 text-sm text-amber-700">
            Featured destinations are unavailable: {featuredError}
          </p>
        )}

        {loading && (
          <div className="py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-3 text-gray-600">Loading countries...</p>
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">Oops!</h2>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={loadCountries}
              className="mt-3 rounded bg-red-600 px-4 py-2 text-white"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredCountries.length === 0 && (
          <p className="mt-10 text-center text-gray-600">No countries found.</p>
        )}

        {!loading && !error && filteredCountries.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((country) => (
              <DestinationCard key={country.codes?.alpha_3} destination={country} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Destinations;
