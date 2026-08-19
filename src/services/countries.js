export default async function handler(req, res) {
  const response = await fetch(
    "https://api.restcountries.com/countries/v5?limit=100",
    {
      headers: {
        Authorization: `Bearer ${process.env.VITE_COUNTRIES_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  return res.status(response.status).json(data);
}