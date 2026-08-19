const COUNTRIES_URL =
  "https://api.restcountries.com/countries/v5?limit=100&response_fields=names,region,capitals,codes,flag,coordinates";

export default async function handler(req, res) {
  const { resource } = req.query;

  try {
    if (resource === "countries") return await handleCountries(res);
    if (resource === "country") return await handleCountry(req, res);
    if (resource === "sights") return await handleSights(req, res);
    return res.status(400).json({ error: "Unknown resource" });
  } catch {
    return res.status(502).json({ error: "Upstream request failed" });
  }
}

function countriesHeaders() {
  const apiKey = process.env.COUNTRIES_API_KEY;
  if (!apiKey) throw new Error("Missing Countries API key");
  return { Authorization: `Bearer ${apiKey}` };
}

async function handleCountries(res) {
  const responses = await Promise.all(
    [0, 100, 200].map((offset) =>
      fetch(`${COUNTRIES_URL}&offset=${offset}`, {
        headers: countriesHeaders(),
      }),
    ),
  );

  const failedResponse = responses.find((response) => !response.ok);
  if (failedResponse) {
    return res.status(failedResponse.status).json(await failedResponse.json());
  }

  const pages = await Promise.all(responses.map((response) => response.json()));
  return res.status(200).json({
    data: { objects: pages.flatMap((page) => page.data?.objects || []) },
  });
}

async function handleCountry(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Country code is required" });

  const response = await fetch(
    `https://api.restcountries.com/countries/v5/codes.alpha_3/${encodeURIComponent(code)}?response_fields=names,region,capitals,codes,flag,coordinates`,
    { headers: countriesHeaders() },
  );
  const data = await response.json();
  return res.status(response.status).json(data);
}

async function handleSights(req, res) {
  const { minLon, minLat, maxLon, maxLat } = req.query;
  if (!minLon || !minLat || !maxLon || !maxLat) {
    return res
      .status(400)
      .json({ error: "minLon, minLat, maxLon, and maxLat are required" });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) throw new Error("Missing Geoapify API key");

  const params = new URLSearchParams({
    categories: "tourism.sights",
    filter: `rect:${minLon},${minLat},${maxLon},${maxLat}`,
    limit: "50",
    apiKey,
  });
  const response = await fetch(`https://api.geoapify.com/v2/places?${params}`);
  const data = await response.json();
  return res.status(response.status).json(data);
}
