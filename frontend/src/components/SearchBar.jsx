function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a country..."
        className="w-full rounded-lg border border-white/70 bg-white/95 px-5 py-3 text-slate-900 shadow-lg outline-none placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default SearchBar;
