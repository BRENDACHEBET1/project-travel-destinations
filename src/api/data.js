// Runs on Vercel's servers only. The browser always calls same-origin
// /api/data, so there's no cross-origin request to fail on any device,
// and neither API key ever ships to the client.

export default async function handler(req, res) {
  const { resource } = req.query;

  try {
    if (resource === "countries") {
      return await handleCountries(req, res);
    }
    if (resource === "sights") {
      return await handleSights(req, res);
    }
    return res.status(400).json({ error: "Unknown resource" });
  } catch {
    return res.status(502).json({ error: "Upstream request failed" });
  }
}

async function handleCountries(req, res) {
  const responses = await Promise.all(
    [0, 100, 200].map((offset) =>
      fetch(
        `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}&response_fields=names,region,capitals,codes,flag,coordinates`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COUNTRIES_API_KEY}`,
          },
        },
      ),
    ),
  );

  const failedResponse = responses.find((response) => !response.ok);
  if (failedResponse) {
    return res.status(failedResponse.status).json(await failedResponse.json());
  }

  const pages = await Promise.all(responses.map((response) => response.json()));
  return res.status(200).json({
    data: {
      objects: pages.flatMap((page) => page.data?.objects || []),
    },
  });
}

async function handleSights(req, res) {
  const { minLon, minLat, maxLon, maxLat } = req.query;

  if (!minLon || !minLat || !maxLon || !maxLat) {
    return res
      .status(400)
      .json({ error: "minLon, minLat, maxLon, maxLat are required" });
  }

  const params = new URLSearchParams({
    categories: "tourism.sights",
    filter: `rect:${minLon},${minLat},${maxLon},${maxLat}`,
    limit: "50",
    apiKey: process.env.GEOAPIFY_API_KEY,
  });

  const response = await fetch(`https://api.geoapify.com/v2/places?${params}`);
  const data = await response.json();
  return res.status(response.status).json(data);
}
