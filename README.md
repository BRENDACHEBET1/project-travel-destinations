# WorldExplorer

WorldExplorer is a React travel discovery app. Browse countries, filter by region, search by name, and open a country to see nearby tourist destinations and images.

## Features

- Homepage travel-image slideshow and country search
- Country search and regional category filters
- Country detail pages with capital and region information
- Nearby tourist destinations from Geoapify
- Destination images from Wikipedia and Wikimedia Commons
- Responsive Tailwind CSS interface

## Tech stack

- React and React Router
- Vite
- Tailwind CSS
- Vercel serverless functions

## APIs

- [REST Countries](https://restcountries.com/docs/countries) for country data
- [Geoapify Places](https://apidocs.geoapify.com/docs/places/) for tourist destinations
- [Wikipedia / MediaWiki PageImages](https://www.mediawiki.org/wiki/Extension:PageImages/en) for destination images

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_COUNTRIES_API_KEY=your_rest_countries_key
   VITE_GEOAPIFY_API_KEY=your_geoapify_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Scripts

```bash
npm run dev      # Start Vite locally
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Project structure

```text
src/
  api/          Frontend functions that request data
  components/   Reusable React UI components
  pages/        Home, About, destinations, and detail pages
api/
  data.js       Vercel serverless function for production API requests
public/         Images and other public assets
```

## Deploy to Vercel

Vercel deploys `api/data.js` as the `/api/data` serverless endpoint. Add these environment variables in **Vercel → Project Settings → Environment Variables** before deploying:

```env
COUNTRIES_API_KEY=your_rest_countries_key
GEOAPIFY_API_KEY=your_geoapify_key
```

After adding or changing an environment variable, redeploy the project. Ensure Vercel is deploying the branch that contains the root-level `api/data.js` file.
