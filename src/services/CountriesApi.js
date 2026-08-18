// Base URL for the REST Countries API
const API_URL = "https://restcountries.com/v3.1";

// Get all countries
export async function getCountries() {
  // Send a request to the API
  const response = await fetch(`${API_URL}/all`);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  // Convert the response into JavaScript data
  const data = await response.json();

  // Return the country data
  return data;
}

// Get one country using its three-letter country code
// Example: KEN for Kenya
export async function getCountryByCode(code) {
  // Send a request for the selected country
  const response = await fetch(`${API_URL}/alpha/${code}`);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch country");
  }

  // Convert the response into JavaScript data
  const data = await response.json();

  // Return the country data
  return data;
}