import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sampleImage from "./login_img.jpg"; // Replace with the correct path to your image
import "./signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup Response:", response.data);
      alert("Signup successful!");
      navigate("/login"); // Redirect user to login page
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Signup failed. Please check your details.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-form-section">
        <div className="signup-form-wrapper">
          <h2>Create an Account</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div> */}

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <button onClick={handleBackToLogin} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
      </div>

      <div className="signup-image-section">
        <img src={sampleImage} alt="Signup Visual" className="signup-image" />
      </div>
    </div>
  );
};

export default Signup;
