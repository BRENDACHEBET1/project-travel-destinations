import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const countries = [
    {
      id: "kenya",
      name: "Kenya",
      region: "Africa",
      capital: "Nairobi",
      image: "https://flagcdn.com/w640/ke.png",
    },
    {
      id: "japan",
      name: "Japan",
      region: "Asia",
      capital: "Tokyo",
      image: "https://flagcdn.com/w640/jp.png",
    },
    {
      id: "france",
      name: "France",
      region: "Europe",
      capital: "Paris",
      image: "https://flagcdn.com/w640/fr.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Explore Countries
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Choose a country and discover amazing tourist destinations,
              cultures, and places to visit.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar />
          </div>

          {/* Country cards */}
          <section className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((country) => (
                <DestinationCard
                  key={country.id}
                  destination={country}
                />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Destinations;