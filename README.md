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

1. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_COUNTRIES_API_KEY=your_rest_countries_key
   VITE_GEOAPIFY_API_KEY=your_geoapify_key
   ```

3. Start the development server from `frontend/`:

   ```bash
   npm run dev
   ```

## Connect the frontend to the Flask API

1. Configure the database connection in the root `.env` file:

   ```env
   DATABASE_URL=your_postgresql_connection_url
   ```

2. In a second terminal, start the Flask server:

   ```bash
   cd server
   pip install -r requirements.txt
   python seed.py # optional: add sample destinations
   python app.py
   ```

   The API runs on `http://localhost:5000`. The Vite development server proxies
   `/api/destinations` requests to it automatically.

3. For a deployed frontend, set `VITE_API_URL` in the frontend deployment's
   environment variables to the public URL of the deployed Flask API, for
   example `https://your-api.example.com`. Rebuild the frontend after adding it.

The temporary save flow uses the seeded user with ID `1`. Set
`VITE_DEMO_USER_ID` in `.env` to use another existing user ID. This is a
development-only placeholder until authentication is added.

## Scripts

```bash
cd frontend
npm run dev      # Start Vite locally
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Project structure

```text
frontend/
  src/
    api/          Frontend functions that request data
    components/   Reusable React UI components
    pages/        Home, About, destinations, and detail pages
  public/         Images and other public assets
  package.json    Frontend dependencies and scripts
  vite.config.js  Vite configuration
api/
  data.js       Vercel serverless function for production API requests
server/         Flask backend
```

## Deploy to Vercel

The repository uses `vercel.json` to install and build the React app from
`frontend/`, while keeping the root-level `api/data.js` serverless endpoint.
Do not set Vercel's Root Directory to `frontend`, because that would exclude
the root-level API function from the deployment.

Vercel deploys `api/data.js` as the `/api/data` serverless endpoint. Add these environment variables in **Vercel → Project Settings → Environment Variables** before deploying:

```env
COUNTRIES_API_KEY=your_rest_countries_key
GEOAPIFY_API_KEY=your_geoapify_key
```

After adding or changing an environment variable, redeploy the project. Ensure Vercel is deploying the branch that contains the root-level `api/data.js` file.
