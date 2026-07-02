import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieCard = ({ movie }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(movie.imdbID);
    if (saved) setRating(Number(saved));
  }, [movie.imdbID]);

  const rate = (val) => {
    setRating(val);
    localStorage.setItem(movie.imdbID, val);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-3">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          className="w-full h-72 object-cover rounded-lg"
        />
      </Link>

      <h2 className="mt-2 font-semibold">{movie.Title}</h2>
      <p className="text-gray-400 text-sm">{movie.Year}</p>
      <p className="text-gray-500 text-xs">{movie.Genre}</p>

      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            onClick={() => rate(s)}
            className={`cursor-pointer text-xl ${
              s <= rating ? "text-yellow-400" : "text-gray-600"
            }`}
          >
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;