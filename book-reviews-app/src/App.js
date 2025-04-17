import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyReviews from "./pages/MyReviews";
import BookReviews from "./pages/BookReviews";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />}
      <div className="container">
        <Routes>
          {!user ? (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/" element={<BookReviews />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
