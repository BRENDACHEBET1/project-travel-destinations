# WorldExplorer

WorldExplorer is a React and Flask travel discovery app. Browse countries, filter by region, search by name, and open a country to see nearby tourist destinations and images. Create an account to save places with personal notes.

## Live Demo

- **Frontend:** https://project-travel-destinations.vercel.app/
- **Backend API:** https://worldexplorer-backend.onrender.com
## Project brief

### Problem

Travel information is often scattered across several sites, making it harder
for a traveller to move from broad country research to planning specific
places to visit. WorldExplorer brings country discovery, nearby attractions,
and a personal saved list into one focused experience.

### Solution and value

The application gives visitors a visual way to explore countries by name or
region, then surfaces nearby tourist destinations with useful location details
and images. Registered users can keep a private shortlist and add notes such
as trip ideas, timings, or reminders. This turns browsing into a lightweight
planning workflow without requiring users to manage a spreadsheet or multiple
bookmarks.

### Target users

- Travellers researching potential countries and attractions
- Students and casual explorers learning about places around the world
- Anyone who wants a simple, personal list of destinations to revisit later

### Core goals

- Make country and destination discovery quick, visual, and responsive.
- Provide search and regional filters that help users narrow a large dataset.
- Protect personal saved destinations with account authentication and
  record-level ownership rules.
- Keep the frontend and deployed Flask API independently configurable.

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
restricted to the signed-in account. New destinations are owned by their
creator, and only that account can edit or delete them. The application does
not expose public user-management routes.

## API endpoints

Protected endpoints require an `Authorization: Bearer <access_token>` header.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account and return an access token. |
| `POST` | `/api/auth/login` | Public | Sign in and return an access token. |
| `GET` | `/api/auth/me` | Authenticated | Return the current account. |
| `GET` | `/api/destinations` | Public | List stored destinations. |
| `GET` | `/api/destinations/:id` | Public | Return one destination. |
| `POST` | `/api/destinations` | Authenticated | Create a destination owned by the current user. |
| `PATCH` | `/api/destinations/:id` | Owner only | Update a destination. |
| `DELETE` | `/api/destinations/:id` | Owner only | Delete a destination. |
| `GET` | `/api/saved-destinations` | Authenticated | List the current user's saved destinations. |
| `GET` | `/api/saved-destinations/:id` | Owner only | Return one saved destination. |
| `POST` | `/api/saved-destinations` | Authenticated | Save a destination with an optional note. |
| `PATCH` | `/api/saved-destinations/:id` | Owner only | Update a saved destination or its note. |
| `DELETE` | `/api/saved-destinations/:id` | Owner only | Remove a saved destination. |

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
