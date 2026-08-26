import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  // Get the country name
  const countryName =
    typeof destination.names?.common === "string"
      ? destination.names.common
      : "Unknown country";

  // Get the region
  const region =
    typeof destination.region === "string"
      ? destination.region
      : "Unknown";

  // Get the capital
  const capitalData = destination.capitals?.[0];

  let capital = "No capital available";

  if (typeof capitalData === "string") {
    capital = capitalData;
  } else if (capitalData?.name) {
    capital = capitalData.name;
  }

  // Get the country code
  const countryCode = destination.codes?.alpha_3;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Country flag */}
      {destination.flag?.url_png ? (
        <img
          src={destination.flag.url_png}
          alt={`Flag of ${countryName}`}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-200 text-gray-500">
          No flag available
        </div>
      )}

      <div className="p-6">

        {/* Country name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {countryName}
        </h2>

        {/* Region */}
        <p className="mt-2 text-gray-600">
          Region: {region}
        </p>

        {/* Capital */}
        <p className="text-gray-600">
          Capital: {capital}
        </p>

        {/* Explore button */}
        <Link
          to={`/destinations/${countryCode}`}
          className="mt-5 inline-block rounded-lg bg-blue-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Explore {countryName}
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;