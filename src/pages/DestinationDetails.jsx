import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { getCountries } from "../services/CountriesApi";
import { getTouristDestinations } from "../services/GeoapifyApi";

function DestinationDetails() {
  const { country } = useParams();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const countries = await getCountries();

        const foundCountry = countries.find(
          (item) =>
            item.codes?.alpha_3?.toLowerCase() ===
            country?.toLowerCase()
        );

        if (!foundCountry) {
          throw new Error("Country not found");
        }

        setSelectedCountry(foundCountry);

        // Country coordinates
        const lat = foundCountry.coordinates?.lat;
        const lon = foundCountry.coordinates?.lng;

        /*
          We create a large search area around the country.

          This works for countries where the API provides
          the country's centre coordinates.
        */
        const minLon = lon - 10;
        const minLat = lat - 10;
        const maxLon = lon + 10;
        const maxLat = lat + 10;

        const places = await getTouristDestinations(
          minLon,
          minLat,
          maxLon,
          maxLat
        );

        setDestinations(places);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [country]);

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="p-10 text-center">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <main className="p-10 text-center">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            ← Back
          </button>
        </main>
      </>
    );
  }

  if (!selectedCountry) {
    return null;
  }

  const countryName =
    selectedCountry.names?.common || "Unknown";

  const region =
    selectedCountry.region || "Unknown";

  const capital =
    selectedCountry.capitals?.[0]?.name ||
    selectedCountry.capitals?.[0] ||
    "No capital";

  const population =
    selectedCountry.population?.toLocaleString() ||
    "Unknown";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-600"
          >
            ← Back to countries
          </button>

          <div className="rounded-xl bg-white p-8 shadow">

            <h1 className="text-4xl font-bold">
              {countryName}
            </h1>

            <p className="mt-2 text-gray-600">
              Discover popular tourist attractions and
              places to visit.
            </p>

            {/* Country information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">
                  Region
                </p>
                <p className="font-semibold">
                  {region}
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">
                  Capital
                </p>
                <p className="font-semibold">
                  {capital}
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">
                  Population
                </p>
                <p className="font-semibold">
                  {population}
                </p>
              </div>

            </div>

            {/* Tourist destinations */}
            <section className="mt-12">

              <h2 className="text-2xl font-bold">
                Tourist Destinations
              </h2>

              <p className="mt-2 text-gray-600">
                Explore popular attractions in {countryName}.
              </p>

              {destinations.length > 0 ? (

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                  {destinations.map((destination, index) => {

                    const properties =
                      destination.properties || {};

                    const name =
                      properties.name ||
                      "Unnamed tourist attraction";

                    const address =
                      properties.formatted ||
                      "Location unavailable";

                    const category =
                      properties.categories?.[0] ||
                      "Tourist attraction";

                    return (
                      <div
                        key={
                          properties.place_id || index
                        }
                        className="rounded-xl bg-gray-50 p-6 shadow-sm"
                      >

                        <h3 className="text-xl font-bold">
                          {name}
                        </h3>

                        <p className="mt-2 text-sm text-blue-600">
                          {category}
                        </p>

                        <p className="mt-3 text-sm text-gray-600">
                          {address}
                        </p>

                      </div>
                    );
                  })}

                </div>

              ) : (

                <p className="mt-6 text-gray-600">
                  No tourist destinations found.
                </p>

              )}

            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

export default DestinationDetails;