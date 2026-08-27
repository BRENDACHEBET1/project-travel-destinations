const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const TOKEN_KEY = "worldexplorer_access_token";

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function errorMessage(body) {
  if (typeof body?.error === "string") return body.error;
  if (typeof body?.message === "string") return body.message;
  return "Unable to reach the backend. Start the Flask server and try again.";
}

async function request(path, options = {}) {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
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

export function getSavedDestinations() {
  return request("/api/saved-destinations");
}

async function authenticate(path, details) {
  const data = await request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.user;
}

export function register(details) {
  return authenticate("/api/auth/register", details);
}

export function login(details) {
  return authenticate("/api/auth/login", details);
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

export async function savePlace(place) {
  const destinations = await getDestinations();
  let destination = destinations.find((item) => matchesPlace(item, place));

  if (!destination) {
    destination = await request("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placePayload(place)),
    });
  }

  const savedDestinations = await getSavedDestinations();
  const existingSave = savedDestinations.find(
    (saved) => saved.destination_id === destination.id,
  );
  if (existingSave) return existingSave;

  return request("/api/saved-destinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination_id: destination.id }),
  });
}
