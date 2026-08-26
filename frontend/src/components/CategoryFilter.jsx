const CategoryFilter = ({ activeCategory, setActiveCategory }) => {

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
          type="button"
          onClick={() => setActiveCategory(category)}
          aria-pressed={activeCategory === category}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            activeCategory === category
              ? "border-blue-600 bg-blue-950 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-blue-900 hover:bg-blue-950 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
};

export default CategoryFilter;
