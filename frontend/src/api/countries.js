const API_ENDPOINT = "/api/data";
const COUNTRIES_QUERY =
  "limit=100&response_fields=names,region,capitals,codes,flag,coordinates";
const COUNTRY_FIELDS = "names,region,capitals,codes,flag,coordinates";
const WIKIPEDIA_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const WIKIMEDIA_COMMONS_ENDPOINT = "https://commons.wikimedia.org/w/api.php";

async function readJson(response, resource) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const details =
      typeof body?.error === "string"
        ? body.error
        : typeof body?.message === "string"
          ? body.message
          : "";
    throw new Error(
      details ? `Unable to load ${resource}: ${details}` : `Unable to load ${resource}`,
    );
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

  if (import.meta.env.DEV && resource === "country") {
    const response = await fetch(
      `/api/country/${encodeURIComponent(params.code)}?response_fields=${COUNTRY_FIELDS}`,
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

export async function getCountry(code) {
  const data = await fetchResource("country", { code });
  return data.data?.objects?.[0] || null;
}

async function getWikipediaImage(title) {
  if (!title) return undefined;

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: title,
    gsrnamespace: "0",
    gsrlimit: "1",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "600",
    format: "json",
    origin: "*",
  });
  const response = await fetch(`${WIKIPEDIA_ENDPOINT}?${params}`);
  const data = await readJson(response, "Wikimedia image");
  const wikipediaImage = Object.values(data.query?.pages || {})[0]?.thumbnail
    ?.source;
  if (wikipediaImage) return wikipediaImage;

  const commonsParams = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: title,
    gsrnamespace: "6",
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "600",
    format: "json",
    origin: "*",
  });
  const commonsResponse = await fetch(
    `${WIKIMEDIA_COMMONS_ENDPOINT}?${commonsParams}`,
  );
  const commonsData = await readJson(commonsResponse, "Wikimedia image");

  return Object.values(commonsData.query?.pages || {})[0]?.imageinfo?.[0]
    ?.thumburl;
}

export async function getTouristDestinations(
  minLon,
  minLat,
  maxLon,
  maxLat,
  countryName,
) {
  const data = await fetchResource("sights", {
    minLon,
    minLat,
    maxLon,
    maxLat,
  });

  const normalizeCountryName = (name) => name?.trim().toLowerCase();
  const places = (data.features || [])
    .filter(
      (place) =>
        normalizeCountryName(place.properties?.country) ===
        normalizeCountryName(countryName),
    )
    .slice(0, 9);
  return Promise.all(
    places.map(async (place) => {
      try {
        const image = await getWikipediaImage(place.properties?.name);

        return { ...place, properties: { ...place.properties, image } };
      } catch {
        return place;
      }
    }),
  );
}
