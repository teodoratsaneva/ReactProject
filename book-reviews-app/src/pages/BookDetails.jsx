import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => setBook(res.data))
            .catch(err => console.error("Error fetching book:", err));

        axios.get(`http://localhost:5000/reviews?bookId=${id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error fetching reviews:", err));
    }, [id]);

    if (!book) return <p>Loading book details...</p>;

    return (
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
            </div>
        </div>

    );
};

export default BookDetails;
