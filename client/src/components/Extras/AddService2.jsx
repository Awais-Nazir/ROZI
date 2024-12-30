import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddService.css";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    profilePicture: "", // Base64 string will be stored here
  });
  const navigate = useNavigate();

  const categories = [
    "Electrician",
    "Plumber",
    "Mechanic",
    "Painter",
    "Cleaning",
    "Teaching",
    "Carpentry",
    "Gardening",
    "IT Support",
    "Other",
  ];

  // Handle text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image input and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result }); // Store Base64 string
    };

    if (file) {
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // Navigate back to the services page
  const handleBackToServices = () => {
    navigate("/services");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const seller = localStorage.getItem("id"); // Get seller ID from local storage
    if (!seller) {
      alert("You must log in first!");
      return;
    }

    if (!formData.title || !formData.description || !formData.category) {
      alert("Please fill all the required fields!");
      return;
    }

    try {
      const payload = {
        seller,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        profilePicture: formData.profilePicture, // Include Base64 image
      };

      const response = await axios.post("http://localhost:5000/api/services/create", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Service added successfully!");
      navigate("/services"); // Navigate to the services page
    } catch (err) {
      console.error("Error adding service:", err);
      alert("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="add-service-container">
      <h2>Add a Service</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Upload Profile Picture:</label>
          <input type="file" id="profilePicture" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-btn">
          Add Service
        </button>
        <button onClick={handleBackToServices} className="back-login">
          Back to Services
        </button>
      </form>
    </div>
  );
};

export default AddService;
