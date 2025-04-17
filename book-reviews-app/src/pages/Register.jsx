import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    login({ email });
    navigate("/");
  };

  return (
    <div className="auth-form-wrapper">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
        <div>
          <p>Already have an account? </p>
          <button type="button" onClick={() => navigate("/login")}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
