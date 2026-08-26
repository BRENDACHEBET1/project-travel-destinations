import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getCountry, getTouristDestinations } from "../api/countries";
import { savePlaceForUser } from "../api/backend";

const DEMO_USER_ID = Number(import.meta.env.VITE_DEMO_USER_ID || 1);

function DestinationDetails() {
  const { country } = useParams();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingPlaceId, setSavingPlaceId] = useState("");
  const [savedPlaceIds, setSavedPlaceIds] = useState([]);
  const [saveError, setSaveError] = useState("");

  async function savePlace(place, placeId) {
    setSavingPlaceId(placeId);
    setSaveError("");

    try {
      await savePlaceForUser(place, DEMO_USER_ID);
      setSavedPlaceIds((ids) => [...new Set([...ids, placeId])]);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSavingPlaceId("");
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const found = await getCountry(country);

        if (!found) throw new Error("Country not found");
        setSelectedCountry(found);

        // Search a 10-degree box around the country's centre point
        const lat = found.coordinates?.lat;
        const lon = found.coordinates?.lng;
        const nearbyPlaces = await getTouristDestinations(
          lon - 10,
          lat - 10,
          lon + 10,
          lat + 10,
          found.names?.common,
        );
        setPlaces(nearbyPlaces);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [country]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="mt-3 text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="p-10">
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">Oops!</h2>
            <p className="mt-2 text-red-600">{error}</p>
          </div>
          <button onClick={() => navigate(-1)} className="mx-auto mt-4 block text-blue-600">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const name = selectedCountry.names?.common || "Unknown";
  const region = selectedCountry.region || "Unknown";
  const capital = selectedCountry.capitals?.[0]?.name || selectedCountry.capitals?.[0] || "No capital";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-600">
          ← Back to countries
        </button>

        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold">{name}</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Region</p>
              <p className="font-semibold">{region}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Capital</p>
              <p className="font-semibold">{capital}</p>
            </div>
          </div>

          <h2 className="mt-10 text-2xl font-bold">Tourist Destinations</h2>
          <p className="mt-2 text-sm text-gray-600">
            Save places to your temporary traveler profile.
          </p>

          {saveError && (
            <p className="mt-3 text-sm text-red-600">Unable to save: {saveError}</p>
          )}

          {places.length === 0 && <p className="mt-4 text-gray-600">No tourist destinations found.</p>}

          {places.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place, index) => {
                const placeId = `${place.properties?.place_id || place.properties?.name || "place"}-${index}`;
                const isSaving = savingPlaceId === placeId;
                const isSaved = savedPlaceIds.includes(placeId);

                return (
                <div key={placeId} className="overflow-hidden rounded-lg bg-gray-50">
                  {place.properties?.image ? (
                    <img
                      src={place.properties.image}
                      alt={place.properties?.name || "Tourist destination"}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-slate-200 text-sm text-slate-500">
                      Image unavailable
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold">{place.properties?.name || "Unnamed"}</h3>
                    <p className="mt-1 text-sm text-blue-600">
                      {place.properties?.categories?.[0] || "Tourist attraction"}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {place.properties?.formatted || "Location unavailable"}
                    </p>
                    <button
                      type="button"
                      onClick={() => savePlace(place, placeId)}
                      disabled={isSaving || isSaved}
                      className="mt-4 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {isSaved ? "Saved" : isSaving ? "Saving..." : "Save destination"}
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DestinationDetails;
