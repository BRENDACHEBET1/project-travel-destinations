import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const DestinationDetails = () => {
  // Get the destination ID from the URL
  // Example: /destinations/kenya → id = "kenya"
  const { id } = useParams();

  // Allows us to navigate to another page
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-5xl">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to destinations
          </button>

          {/* Destination card */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-md">

            {/* Destination image */}
            <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 sm:h-80">
              {/* Image will be added when we connect the API */}
            </div>

            {/* Destination information */}
            <div className="p-6 sm:p-10">

              {/* Label */}
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Destination
              </p>

              {/* Destination name */}
              <h1 className="mt-2 text-4xl font-bold capitalize text-gray-900">
                {id}
              </h1>

              {/* Description */}
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Discover information about this destination, including its
                location, culture, population, language, and other interesting
                facts.
              </p>

              {/* Destination information grid */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {/* Region */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Region
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    Africa
                  </p>
                </div>

                {/* Capital */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Capital
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    Nairobi
                  </p>
                </div>

                {/* Population */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Population
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    55 Million
                  </p>
                </div>

                {/* Currency */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Currency
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    Kenyan Shilling
                  </p>
                </div>

              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetails;