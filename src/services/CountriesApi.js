// Base URL for our Vite proxy
const BASE_URL = "/api/countries/v5";

// Get the API key from the .env file
const API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;

// Get all countries
export async function getCountries() {
  // Store all countries from all pages
  let allCountries = [];

  // Start at the first country
  let offset = 0;

  // Maximum number of countries per request on the free plan
  const limit = 100;

  // Keep requesting pages while there are more countries
  let more = true;

  while (more) {
    // Send a request for the current page
    const response = await fetch(
      `${BASE_URL}?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    // Convert the response to JavaScript data
    const data = await response.json();

    // Add the countries from this page to our array
    allCountries = [
      ...allCountries,
      ...data.data.objects,
    ];

    // Check whether the API has another page
    more = data.data.meta.more;

    // Move to the next page
    offset += limit;
  }

  // Return all countries
  return allCountries;
}

// Get one country using its three-letter country code
// Example: KEN for Kenya
export async function getCountryByCode(code) {
  // Send a request for the selected country
  const response = await fetch(
    `${BASE_URL}/codes.alpha_3/${code}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch country");
  }

  // Convert the response into JavaScript data
  const data = await response.json();

  // Return the first matching country
  return data.data.objects[0];
}