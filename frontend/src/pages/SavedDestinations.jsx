import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getSavedDestinations, isAuthenticated } from "../api/backend";

function SavedDestinations() {
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    getSavedDestinations()
      .then(setSavedDestinations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900">Saved Destinations</h1>
        {!loading && !isAuthenticated() && (
          <p className="mt-6 text-gray-600">Sign in to view your saved destinations.</p>
        )}
        {loading && <p className="mt-6 text-gray-600">Loading saved destinations...</p>}
        {!loading && error && <p className="mt-6 text-red-600">{error}</p>}
        {!loading && isAuthenticated() && !error && savedDestinations.length === 0 && (
          <p className="mt-6 text-gray-600">You have not saved any destinations yet.</p>
        )}
        {!loading && isAuthenticated() && !error && savedDestinations.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedDestinations.map(({ id, destination }) => (
              <article key={id} className="overflow-hidden rounded-xl bg-white shadow">
                {destination?.image_url ? (
                  <img src={destination.image_url} alt={destination.name} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 bg-slate-200" />
                )}
                <div className="p-5">
                  <h2 className="text-lg font-bold">{destination?.name || "Saved destination"}</h2>
                  {destination?.description && <p className="mt-2 text-sm text-gray-600">{destination.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedDestinations;
