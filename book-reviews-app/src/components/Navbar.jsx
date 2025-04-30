import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/">
            Book Reviews
          </Link>
        </li>
        <li>
          <Link to="/my-reviews">
            My Reviews
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
