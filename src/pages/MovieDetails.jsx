import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

useEffect(() => {
  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );

      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        setMovie(data);
      } else {
        console.error(data.Error);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  fetchMovie();
}, [id, API_KEY]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-black">
        <h1 className="text-2xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black flex items-center justify-center p-2">
      <div className="w-full max-w-6xl ">
        <Link
          to="/"
          className="inline-flex items-center p-2 my-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 text-white hover:bg-white/20 transition"
        >
          ← Back
        </Link>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-[380px_1fr]">
            <div className="flex justify-center items-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="p-4 w-72 rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5 text-white">
              <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                  {movie.Year}
                </span>

                <span className="text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold">
                  {movie.imdbRating}
                </span>

                <span className="text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                  {movie.Genre}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-gray-400 text-sm uppercase mb-2">
                    Released
                  </h3>
                  <p className="text-lg">{movie.Released}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-gray-400 text-sm uppercase mb-2">
                    Runtime
                  </h3>
                  <p className="text-lg">{movie.Runtime}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-gray-400 text-sm uppercase mb-2">
                    Director
                  </h3>
                  <p className="text-lg">{movie.Director}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-gray-400 text-sm uppercase mb-2">
                    Actors
                  </h3>
                  <p className="text-lg leading-7">{movie.Actors}</p>
                </div>
              </div>

              <div className="mt-10 bg-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-3">Plot</h2>
                <p className="text-gray-300 leading-7 text-justify">
                  {movie.Plot}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;