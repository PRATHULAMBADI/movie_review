import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        const detailed = await Promise.all(
          data.Search.map(async (m) => {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${m.imdbID}`
            );
            return res.json();
          })
        );

        setMovies(detailed);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setMovies([]);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      fetchMovies("Marvel");
    } else {
      fetchMovies(search);
    }
  }, [search]);

  const filteredMovies = movies.filter((m) => {
    const matchYear = year ? m.Year === year : true;

    const matchGenre = genre
      ? m.Genre?.toLowerCase()
          .split(",")
          .map((g) => g.trim())
          .includes(genre.toLowerCase().trim())
      : true;

    const matchRating = rating
      ? rating === "lt5"
        ? Number(m.imdbRating || 0) < 5
        : Number(m.imdbRating || 0) >= Number(rating)
      : true;

    return matchYear && matchGenre && matchRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white p-5">
      <div className="container mx-auto px-6 py-10">

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Movie Explorer
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="">All Genres</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="sci-fi">Sci-Fi</option>
          </select>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="">All Ratings</option>
            <option value="lt5">Less than 5</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>

        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {search.trim()
              ? `Search Results for "${search}"`
              : "Popular Movies"}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Showing {filteredMovies.length} movies
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 place-items-center">

          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl text-gray-300">No movies found</h3>
              <p className="text-gray-500 mt-2">
                Try different search or filters
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Home