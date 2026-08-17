import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function DestinationDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="mb-8 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to destinations
          </button>

          {/* Destination header */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 sm:h-80">
              {/* Destination image will go here */}
            </div>

            <div className="p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Destination
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {id}
              </h1>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Discover information about this destination, including its
                location, culture, population, language, and other interesting
                facts.
              </p>

              {/* Information */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Region
                  </h2>
                  <p className="mt-2 font-semibold text-gray-900">
                    Africa
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Capital
                  </h2>
                  <p className="mt-2 font-semibold text-gray-900">
                    Nairobi
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Population
                  </h2>
                  <p className="mt-2 font-semibold text-gray-900">
                    55 Million
                  </p>
                </div>

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
}

export default DestinationDetails;