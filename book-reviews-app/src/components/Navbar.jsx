import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">Book Reviews</Link>
      </h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </li>
        <li>
          <Link to="/my-reviews" className="hover:underline">
            My Reviews
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
