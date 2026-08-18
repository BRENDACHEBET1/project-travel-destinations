import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Display the country's flag */}
      <img
        src={destination.flag?.png}
        alt={`Flag of ${destination.names?.common}`}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">

        {/* Country name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {destination.names?.common}
        </h2>

        {/* Country region */}
        <p className="mt-2 text-gray-600">
          Region: {destination.region || "Not available"}
        </p>

        {/* Country capital */}
        <p className="text-gray-600">
          Capital:{" "}
          {destination.capitals?.length > 0
            ? destination.capitals[0].name
            : "No capital available"}
        </p>

        {/* Link to the country details page */}
        <Link
          to={`/destinations/${destination.codes?.alpha_3}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Explore {destination.names?.common}
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;