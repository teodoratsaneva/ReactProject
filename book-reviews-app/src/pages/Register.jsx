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
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    login({ email });
    navigate("/");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <label>Confirm Password:</label><br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br /><br />

        {error && <p style={{ color: "red" }}>{error}</p>}

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
