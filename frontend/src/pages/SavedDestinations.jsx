import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  deleteSavedDestination,
  getSavedDestinations,
  isAuthenticated,
  updateSavedDestination,
} from "../api/backend";

function SavedDestinations() {
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(() => isAuthenticated());
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    getSavedDestinations()
      .then(setSavedDestinations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function startEditing(savedDestination) {
    setError("");
    setEditingId(savedDestination.id);
    setNotes(savedDestination.notes || "");
  }

  async function saveNotes(savedId) {
    setError("");
    setSavingId(savedId);
    try {
      const updated = await updateSavedDestination(savedId, { notes });
      setSavedDestinations((destinations) =>
        destinations.map((destination) =>
          destination.id === savedId ? updated : destination,
        ),
      );
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  }

  async function removeSavedDestination(savedId) {
    if (!window.confirm("Remove this destination from your saved list?")) return;

    setError("");
    setDeletingId(savedId);
    try {
      await deleteSavedDestination(savedId);
      setSavedDestinations((destinations) =>
        destinations.filter((destination) => destination.id !== savedId),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

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
            {savedDestinations.map((savedDestination) => {
              const { id, destination, notes: savedNotes } = savedDestination;
              const isEditing = editingId === id;

              return (
              <article key={id} className="overflow-hidden rounded-xl bg-white shadow">
                {destination?.image_url ? (
                  <img src={destination.image_url} alt={destination.name} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 bg-slate-200" />
                )}
                <div className="p-5">
                  <h2 className="text-lg font-bold">{destination?.name || "Saved destination"}</h2>
                  {destination?.description && <p className="mt-2 text-sm text-gray-600">{destination.description}</p>}
                  {isEditing ? (
                    <div className="mt-4">
                      <label htmlFor={`notes-${id}`} className="text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        id={`notes-${id}`}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Add a note about this destination"
                        className="mt-1 min-h-24 w-full rounded border border-gray-300 p-2 text-sm"
                      />
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => saveNotes(id)} disabled={savingId === id} className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:bg-slate-400">
                          {savingId === id ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} disabled={savingId === id} className="rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {savedNotes && <p className="mt-3 text-sm text-gray-700">{savedNotes}</p>}
                      <div className="mt-4 flex gap-2">
                        <button type="button" onClick={() => startEditing(savedDestination)} className="rounded border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600">
                          Edit
                        </button>
                        <button type="button" onClick={() => removeSavedDestination(id)} disabled={deletingId === id} className="rounded border border-red-600 px-3 py-2 text-sm font-medium text-red-600 disabled:border-slate-400 disabled:text-slate-400">
                          {deletingId === id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedDestinations;
