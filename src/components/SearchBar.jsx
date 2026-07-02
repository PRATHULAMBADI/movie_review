
function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        value={search}
        placeholder="Search movies..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl px-5 py-3 border border-gray-300 rounded-full bg-white text-black outline-none"/>
    </div>
  );
}

export default SearchBar