const API_ENDPOINT = "/api/data";
const COUNTRIES_QUERY =
  "limit=100&response_fields=names,region,capitals,codes,flag,coordinates";

async function readJson(response, resource) {
  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(`The ${resource} service returned an invalid response`);
  }

  return response.json();
}

async function fetchResource(resource, params = {}) {
  if (import.meta.env.DEV && resource === "countries") {
    const pages = await Promise.all(
      [0, 100, 200].map(async (offset) => {
        const response = await fetch(
          `/api/countries?${COUNTRIES_QUERY}&offset=${offset}`,
        );

        return readJson(response, resource);
      }),
    );

    return {
      data: {
        objects: pages.flatMap((page) => page.data?.objects || []),
      },
    };
  }

  if (import.meta.env.DEV && resource === "sights") {
    const searchParams = new URLSearchParams({
      categories: "tourism.sights",
      filter: `rect:${params.minLon},${params.minLat},${params.maxLon},${params.maxLat}`,
      limit: "50",
      apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
    });
    const response = await fetch(
      `https://api.geoapify.com/v2/places?${searchParams}`,
    );

    return readJson(response, resource);
  }

  const searchParams = new URLSearchParams({ resource, ...params });
  const response = await fetch(`${API_ENDPOINT}?${searchParams}`);
  return readJson(response, resource);
}

export async function getCountries() {
  const data = await fetchResource("countries");
  return data.data?.objects || data;
}

export async function getTouristDestinations(minLon, minLat, maxLon, maxLat) {
  const data = await fetchResource("sights", {
    minLon,
    minLat,
    maxLon,
    maxLat,
  });

  return data.features || [];
}
