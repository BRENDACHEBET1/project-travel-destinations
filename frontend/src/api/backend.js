const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function errorMessage(body) {
  if (typeof body?.error === "string") return body.error;
  if (typeof body?.message === "string") return body.message;
  return "Unable to reach the backend. Start the Flask server and try again.";
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { Accept: "application/json", ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(errorMessage(body));
  }

  return response.json();
}

export function getDestinations() {
  return request("/api/destinations");
}

export async function getSavedDestinations(userId) {
  const savedDestinations = await request("/api/saved-destinations");
  return savedDestinations.filter((saved) => saved.user_id === userId);
}

function placePayload(place) {
  const [longitude, latitude] = place.geometry?.coordinates || [];

  return {
    name: place.properties?.name || "Unnamed destination",
    description: place.properties?.formatted || null,
    image_url: place.properties?.image || null,
    latitude,
    longitude,
  };
}

function matchesPlace(destination, place) {
  const payload = placePayload(place);
  return (
    destination.name === payload.name &&
    destination.latitude === payload.latitude &&
    destination.longitude === payload.longitude
  );
}

export async function savePlaceForUser(place, userId) {
  const destinations = await getDestinations();
  let destination = destinations.find((item) => matchesPlace(item, place));

  if (!destination) {
    destination = await request("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placePayload(place)),
    });
  }

  const savedDestinations = await getSavedDestinations(userId);
  const existingSave = savedDestinations.find(
    (saved) => saved.destination_id === destination.id,
  );
  if (existingSave) return existingSave;

  return request("/api/saved-destinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, destination_id: destination.id }),
  });
}
