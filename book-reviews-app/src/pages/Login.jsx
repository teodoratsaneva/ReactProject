import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      login({ email });
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
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
