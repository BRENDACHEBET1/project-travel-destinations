import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  // Get the country name
  const countryName = destination.names?.common || "Unknown country";

  // Get the capital name
  const capital =
    destination.capitals?.length > 0
      ? destination.capitals[0]?.name
      : "No capital available";

  // Get the country code
  const countryCode = destination.codes?.alpha_2?.toLowerCase();

  // Create a flag URL using the country code
  const flagUrl = countryCode
    ? `https://flagcdn.com/w640/${countryCode}.png`
    : "";

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Display the country's flag */}
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={`Flag of ${countryName}`}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-200">
          <p className="text-gray-500">Flag unavailable</p>
        </div>
      )}

      <div className="p-6">

        {/* Country name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {countryName}
        </h2>

        {/* Country region */}
        <p className="mt-2 text-gray-600">
          Region: {destination.region || "Not available"}
        </p>

        {/* Country capital */}
        <p className="text-gray-600">
          Capital: {capital}
        </p>

        {/* Link to the country details page */}
        <Link
          to={`/destinations/${destination.codes?.alpha_3 || ""}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Explore {countryName}
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;