import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getTouristDestinations } from "../services/WikiMediaApi";

const DestinationDetails = () => {
  // Get the country from the URL
  // Example: /destinations/kenya → country = "kenya"
  const { country } = useParams();

  // Allows us to navigate to another page
  const navigate = useNavigate();

  // Tourist destinations for each country
  const touristDestinations = {
    kenya: [
      {
        name: "Maasai Mara",
        type: "National Reserve",
        description:
          "Famous for wildlife, beautiful landscapes, and the Great Migration.",
      },
      {
        name: "Amboseli National Park",
        type: "National Park",
        description:
          "Known for its large elephant population and views of Mount Kilimanjaro.",
      },
      {
        name: "Diani Beach",
        type: "Beach",
        description:
          "A beautiful coastal destination known for its white sandy beaches and clear water.",
      },
      {
        name: "Nairobi National Park",
        type: "National Park",
        description:
          "A unique wildlife park located just outside Kenya's capital city.",
      },
    ],

    japan: [
      {
        name: "Mount Fuji",
        type: "Mountain",
        description:
          "One of Japan's most famous natural landmarks and a popular destination for visitors.",
      },
      {
        name: "Tokyo",
        type: "City",
        description:
          "Japan's capital city, known for its modern technology, culture, food, and entertainment.",
      },
    ],

    france: [
      {
        name: "Eiffel Tower",
        type: "Landmark",
        description:
          "One of the world's most recognizable landmarks and a symbol of Paris.",
      },
      {
        name: "Louvre Museum",
        type: "Museum",
        description:
          "One of the world's most famous museums, home to thousands of works of art.",
      },
    ],
  };

  // Get destinations for the selected country
  const destinations = touristDestinations[country] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to countries
          </button>

          {/* Country information */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-md">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-12 text-white sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
                Country
              </p>

              <h1 className="mt-2 text-4xl font-bold capitalize sm:text-5xl">
                {country}
              </h1>

              <p className="mt-4 max-w-2xl text-lg text-blue-100">
                Explore tourist destinations and discover amazing places to
                visit in {country}.
              </p>
            </div>

            {/* Country information */}
            <div className="p-6 sm:p-10">

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {/* Region */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Region
                  </h2>

                  <p className="mt-2 font-semibold capitalize text-gray-900">
                    {country === "kenya"
                      ? "Africa"
                      : country === "japan"
                      ? "Asia"
                      : country === "france"
                      ? "Europe"
                      : "Unknown"}
                  </p>
                </div>

                {/* Capital */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Capital
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    {country === "kenya"
                      ? "Nairobi"
                      : country === "japan"
                      ? "Tokyo"
                      : country === "france"
                      ? "Paris"
                      : "Unknown"}
                  </p>
                </div>

                {/* Population */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Population
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    {country === "kenya"
                      ? "55 Million"
                      : country === "japan"
                      ? "124 Million"
                      : country === "france"
                      ? "68 Million"
                      : "Unknown"}
                  </p>
                </div>

                {/* Currency */}
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-sm font-medium text-gray-500">
                    Currency
                  </h2>

                  <p className="mt-2 font-semibold text-gray-900">
                    {country === "kenya"
                      ? "Kenyan Shilling"
                      : country === "japan"
                      ? "Japanese Yen"
                      : country === "france"
                      ? "Euro"
                      : "Unknown"}
                  </p>
                </div>

              </div>

              {/* Tourist destinations */}
              <section className="mt-12">

                <h2 className="text-3xl font-bold text-gray-900">
                  Tourist Destinations in{" "}
                  <span className="capitalize">{country}</span>
                </h2>

                <p className="mt-2 text-gray-600">
                  Explore popular places and attractions in this country.
                </p>

                {destinations.length > 0 ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {destinations.map((destination) => (
                      <div
                        key={destination.name}
                        className="rounded-xl bg-gray-50 p-6 shadow-sm transition hover:shadow-md"
                      >
                        <h3 className="text-xl font-bold text-gray-900">
                          {destination.name}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-blue-600">
                          {destination.type}
                        </p>

                        <p className="mt-3 leading-7 text-gray-600">
                          {destination.description}
                        </p>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="mt-6 rounded-lg bg-gray-50 p-6 text-gray-600">
                    No tourist destinations found for this country.
                  </p>
                )}

              </section>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetails;