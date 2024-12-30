import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddService.css";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    // profilePicture: null, // File object for image
  });
  const navigate = useNavigate();

  const categories = [
    'Electrician',
    'Plumber',
    'Mechanic',
    'Painter',
    'Gardening',
    'Cooking',
    'Teaching',
    'Cleaning',
    'IT Support',
    'Babysitting',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, profilePicture: e.target.files[0] }); // Store the file object
  // };

  // const handleBack =  (e) => {
  //   // e.preventDefault();
  //   const seller = sessionStorage.getItem("id");
  //   if (!seller) {
  //     alert("You must log in first!");
  //     navigate("/services")
  //     // return;
  //   } 
      
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const seller = sessionStorage.getItem("id");
    if (!seller) {
      alert("You must log in first!");
      return;
    }

    const data = new FormData(); // Use FormData for file upload
    data.append("seller", seller);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    // if (formData.image) {
    //   data.append("profilePicture", formData.profilePicture); // Append file
    // }

    try {
      const response = await axios.post("http://localhost:5000/api/services/create", {
        seller,
        "title" : formData.title,
        "description" : formData.description,
        "category" : formData.category
      } );
      alert("Service added successfully!");
      navigate("/services");
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
        {/* <div className="form-group">
          <label htmlFor="profilePicture">Upload Profile Picture:</label>
          <input type="file" id="profilePicture" onChange={handleFileChange} />
        </div> */}
        <button type="submit" className="submit-btn">
          Add Service
        </button>
        <button onClick={() => navigate("/services")} className="back-login">
          Back to Services
        </button>
      </form>
    </div>
  );
};


export default AddService;
