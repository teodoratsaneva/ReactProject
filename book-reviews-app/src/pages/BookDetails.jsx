import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => setBook(res.data))
            .catch(err => console.error("Error fetching book:", err));

        axios.get(`http://localhost:5000/reviews?bookId=${id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error fetching reviews:", err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment) {
            setError("Please fill in comment field.");
            return;
        }

        const newReview = {
            bookId: id,
            user: user.email,
            comment
          };

        try {
            const res = await axios.post("http://localhost:5000/reviews", newReview);
            setReviews(prev => [...prev, res.data]);
            setComment("");
            setError("");
        } catch (err) {
            console.error("Error submitting review:", err);
            setError("Something went wrong.");
        }
    };

    return !book
        ? (<p>Loading book details...</p>)
        : (
            <div className="book-details">
                <h2>{book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>

                <div className="review-section">
                    <h3>Reviews:</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <ul className="review-list">
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <p><strong>{review.user}</strong>: {review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <form onSubmit={handleSubmit} className="review-form">
                        <h4>Add a review:</h4>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <textarea
                            placeholder="Your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
        );
};

export default BookDetails;
