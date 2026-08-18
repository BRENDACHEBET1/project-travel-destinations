import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Country image */}
      <img
        src={destination.image}
        alt={`${destination.name} flag`}
        className="h-48 w-full object-cover"
      />

      {/* Country information */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {destination.name}
        </h2>

        <p className="mt-2 text-gray-600">
          Region: {destination.region}
        </p>

        <p className="text-gray-600">
          Capital: {destination.capital}
        </p>

        <Link
          to={`/destinations/${destination.id}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Explore {destination.name}
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;