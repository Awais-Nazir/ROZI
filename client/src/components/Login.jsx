import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css"; // Assuming CSS for styling is in place
import sampleImage from "./login_img.jpg"; // Replace with your image path
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password, 
      });
      
      if (response.data.token) {
        // localStorage.setItem("authToken" , response.data.token)
        sessionStorage.setItem("id", response.data.id)
        localStorage.setItem("id", response.data.id)
        if (rememberMe) {
          localStorage.setItem("authToken", response.data.token);
        }
        // localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/services"); // Redirect to services page
    }

    setAuthenticated = true;
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Sign in</h1>
        <p>Please login to continue to your account.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Example@domain"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Keep me logged in
            </label>
          </div>
          <button type="submit" className="btn-login">
            Sign in
          </button>
        </form>
        <p className="create-account">
          Need an account? <a href="/signup">Create one</a>
        </p>
      </div>
      <div className="login-image">
        <img src={sampleImage} alt="Workers" />
      </div>
    </div>
  );
};

export default LoginPage;
