const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const BASE_URL = "https://api.geoapify.com/v2/places";

// Get tourist attractions inside a country
export async function getTouristDestinations(
  minLon,
  minLat,
  maxLon,
  maxLat
) {
  const params = new URLSearchParams({
    categories: "tourism.sights",
    filter: `rect:${minLon},${minLat},${maxLon},${maxLat}`,
    limit: "50",
    apiKey: API_KEY,
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tourist destinations");
  }

  const data = await response.json();

  return data.features || [];
}