import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const countries = [
    {
      id: "kenya",
      name: "Kenya",
      region: "Africa",
      capital: "Nairobi",
      image: "https://flagcdn.com/w640/ke.png",
    },
    {
      id: "japan",
      name: "Japan",
      region: "Asia",
      capital: "Tokyo",
      image: "https://flagcdn.com/w640/jp.png",
    },
    {
      id: "france",
      name: "France",
      region: "Europe",
      capital: "Paris",
      image: "https://flagcdn.com/w640/fr.png",
    },
  ];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Explore Countries
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Choose a country and discover amazing tourist destinations,
              cultures, and places to visit.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          {/* Country cards */}
          <section className="mt-10">
            {filteredCountries.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCountries.map((country) => (
                  <DestinationCard
                    key={country.id}
                    destination={country}
                  />
                ))}
              </div>
            ) : (
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

        </div>
      </main>
    </div>
  );
}

export default Destinations;