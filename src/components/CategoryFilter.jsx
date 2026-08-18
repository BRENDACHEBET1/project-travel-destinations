import { Link } from "react-router-dom";

function DestinationCard({ destination }) {

  // The destination object comes from Destinations.jsx
  // Example:
  // {
  //   id: "kenya",
  //   name: "Kenya",
  //   region: "Africa",
  //   capital: "Nairobi",
  //   image: "..."
  // }

  return (
    // Card container
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">

      {/* Destination image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="h-48 w-full object-cover"
      />

      {/* Card content */}
      <div className="p-5">

        {/* Destination name */}
        <h2 className="text-xl font-bold text-gray-900">
          {destination.name}
        </h2>

        {/* Region */}
        <p className="mt-2 text-gray-600">
          {destination.region}
        </p>

        {/* Capital */}
        <p className="mt-1 text-sm text-gray-500">
          Capital: {destination.capital}
        </p>

        {/* Link to the destination details page */}
        {/* Example: /destinations/kenya */}
        <Link
          to={`/destinations/${destination.id}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;