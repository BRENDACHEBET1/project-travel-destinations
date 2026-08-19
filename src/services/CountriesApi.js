const BASE_URL = "/api";

export async function getCountries() {
  const response = await fetch(`${BASE_URL}/countries`);

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();

  return data.data.objects;
}