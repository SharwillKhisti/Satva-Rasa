export default function StarRating({
                                       rating = 0,
                                   }) {
    const roundedRating = Math.round(
        Number(rating)
    );

    return (
        <div
            className="flex items-center gap-0.5"
            aria-label={`Rating: ${rating} out of 5`}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={
                        star <= roundedRating
                            ? "text-yellow-500"
                            : "text-gray-300"
                    }
                >
                    ★
                </span>
            ))}
        </div>
    );
}