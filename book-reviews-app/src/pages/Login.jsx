import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    login({ email });
    navigate("/");
  };

  return (
    <div className="auth-form-wrapper">
      <h2>Login</h2>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
        <div>
          <p>Don't have an account?</p>
          <button type="button" onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
