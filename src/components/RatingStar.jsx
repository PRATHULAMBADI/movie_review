
function RatingStar({ rating, setRating }) {
  return (
    <div className="flex mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStar

