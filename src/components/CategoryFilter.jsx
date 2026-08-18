const CategoryFilter = () => {

  // Available regions
  const categories = [
    "All",
    "Africa",
    "Asia",
    "Europe",
    "Americas",
    "Oceania",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">

      {/* Create a button for each category */}
      {categories.map((category) => (
        <button
          key={category}
          className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
        >
          {category}
        </button>
      ))}

    </div>
  );
};

export default CategoryFilter;