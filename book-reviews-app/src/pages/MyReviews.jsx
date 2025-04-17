import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, booksRes] = await Promise.all([
          axios.get("http://localhost:5000/reviews"),
          axios.get("http://localhost:5000/books")
        ]);

        setReviews(reviewsRes.data);
        setBooks(booksRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  const myReviews = reviews.filter(r => r.user === user?.email);

  const getBookTitle = (bookId) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : "Unknown Book";
  };

  return (
    <div className="book-details">
      <h2>My Reviews</h2>
      {myReviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        <ul className="review-list">
          {myReviews.map((review) => (
            <li key={review.id}>
              <p><strong>Book:</strong> {getBookTitle(review.bookId)}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviews;
