import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Display the country's flag */}
      <img
        src={destination.flags.png}
        alt={`Flag of ${destination.name.common}`}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">

        {/* Country name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {destination.name.common}
        </h2>

        {/* Country region */}
        <p className="mt-2 text-gray-600">
          Region: {destination.region}
        </p>

        {/* Country capital */}
        <p className="text-gray-600">
          Capital:{" "}
          {destination.capital
            ? destination.capital[0]
            : "No capital available"}
        </p>

        {/* Link to the country details page */}
        <Link
          to={`/destinations/${destination.cca3}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Explore {destination.name.common}
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;