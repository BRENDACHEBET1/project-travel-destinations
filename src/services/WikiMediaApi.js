console.log("WikimediaApi.js loaded");
// Base URL for the Wikipedia API
const BASE_URL = "https://en.wikipedia.org/w/api.php";

// Get tourist destinations near a location
export async function getTouristDestinations(lat, lon) {
  // Parameters for the Wikipedia geosearch API
  const params = new URLSearchParams({
    action: "query",
    generator: "geosearch",

    // Latitude and longitude
    ggscoord: `${lat}|${lon}`,

    // Search within 10 km
    ggsradius: "10000",

    // Get up to 12 destinations
    ggslimit: "12",

    // Get coordinates and images
    prop: "coordinates|pageimages",

    // Image size
    piprop: "thumbnail",
    pithumbsize: "400",

    // Return JSON
    format: "json",

    // Allow requests from our React app
    origin: "*",
  });

  // Send request to Wikipedia
  const response = await fetch(`${BASE_URL}?${params}`);

  // Check if request failed
  if (!response.ok) {
    throw new Error("Failed to fetch tourist destinations");
  }

  // Convert response to JavaScript
  const data = await response.json();

  // Wikipedia stores pages inside query.pages
  if (!data.query?.pages) {
    return [];
  }

  // Convert the pages object into an array
  return Object.values(data.query.pages);
}


