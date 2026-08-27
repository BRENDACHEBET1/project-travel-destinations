# WorldExplorer

WorldExplorer is a React and Flask travel discovery app. Browse countries, filter by region, search by name, and open a country to see nearby tourist destinations and images. Create an account to save places with personal notes.

## Features

- Homepage travel-image slideshow and country search
- Country search and regional category filters
- Country detail pages with capital and region information
- Nearby tourist destinations from Geoapify
- Destination images from Wikipedia and Wikimedia Commons
- Account registration and sign-in with JWT authentication
- Save destinations, add personal notes, edit notes, and remove saved destinations
- Responsive Tailwind CSS interface

## Tech stack

- React and React Router
- Vite
- Tailwind CSS
- Flask, SQLAlchemy, and PostgreSQL
- JWT authentication
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
   # Leave unset to use a local Flask API through Vite's proxy.
   # Set this when using a deployed backend.
   VITE_API_URL=https://your-api.example.com
   ```

3. Start the development server from `frontend/`:

   ```bash
   npm run dev
   ```

## Configure the Flask API

1. Create `server/.env` and configure the database connection and JWT secret:

   ```env
   DATABASE_URL=your_postgresql_connection_url
   JWT_SECRET_KEY=use_a_long_random_secret_value
   ```

2. In a second terminal, start the Flask server:

   ```bash
   cd server
   pip install -r requirements.txt
   python seed.py # optional: add sample destinations
   python app.py
   ```

   The API runs on `http://localhost:5000`. When `VITE_API_URL` is not set,
   the Vite development server proxies `/api/auth`, `/api/destinations`, and
   `/api/saved-destinations` requests to it automatically.

3. To use a deployed backend locally or from a deployed frontend, set
   `VITE_API_URL` to its public URL. Restart Vite locally, or rebuild and
   redeploy the frontend after changing the variable.

## Deploy the Flask API to Render

Create a Render **Web Service** from this repository and configure it with:

```text
Root Directory: server
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

Add `DATABASE_URL` and `JWT_SECRET_KEY` as Render environment variables. The
service will not start without `JWT_SECRET_KEY`. Once deployed, use the Render
service URL as `VITE_API_URL` in the frontend environment and redeploy the
frontend.

## Authentication

The API uses JWT authentication. Set a long, random `JWT_SECRET_KEY` in the
backend environment (including Render) before starting the server. Users can
register or sign in from the frontend; saved destinations and their notes are
restricted to the signed-in account.

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
