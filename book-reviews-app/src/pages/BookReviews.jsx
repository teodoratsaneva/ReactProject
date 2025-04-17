import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookReviews = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Book Reviews</h2>
      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
          <div className="book-list">
            {books.map(book => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <button className="review-btn" onClick={() => navigate(`/book-reviews/${book.id}`)}>
                  See Reviews
                </button>
              </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default BookReviews;