import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Document } from "mongoose";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [buttonText, setButtonText] = useState("Logout");
  const navigate = useNavigate();

  const categories = [
    "Electrician",
    "Plumber",
    "Teaching",
    "Cleaning",
    "Gardening",
    "Cooking",
    "Painting",
    "IT Support",
    "Mechanic",
    "Babysitting",
    "Other",
  ];

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setServices(response.data);
        setFilteredServices(response.data); // Initially display all services
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  // Update button text based on session storage
  useEffect(() => {
    const seller = sessionStorage.getItem("id");
    setButtonText(seller ? "Logout" : "Login");
  }, []);

  // Filter services when a category is selected
  useEffect(() => {
    if (selectedCategory === "" ) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) => service.category === selectedCategory
      );
      setFilteredServices(filtered);
    }
  }, [selectedCategory, services]);

  // Logout handler
  const handleLogout = () => {
    const seller = sessionStorage.getItem("id");
    if (!seller){   
      alert("You must login first");
      return;
    }
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.clear();
      setButtonText("Login")
      navigate("/login");
    }
  };

  // Switch to Selling
  const handleSwitchToSelling = () => {
    const seller = sessionStorage.getItem("id");
    if (!seller){
      alert("You must login first");
      return;
    }
    if (window.confirm("Do you want to switch to Selling mode?")) {
      navigate("/add-service");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Explore Services</h1>
        <div>
          <button id = "log-out-btn" onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
          <button onClick={handleSwitchToSelling} style={styles.sellButton}>
            Switch to Selling
          </button>
        </div>
      </div>

      {/* Popular Categories Row */}
      <div style={styles.categoryRow}>
        {categories.slice(0, 10).map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            style={
              selectedCategory === category
                ? styles.selectedCategoryButton
                : styles.categoryButton
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Select Box */}
      <div style={styles.searchContainer}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.selectBox}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Services Display */}
      <div style={styles.cardContainer}>
        {filteredServices.map((service) => (
          <div key={service._id} style={styles.card}>
            <img
              src={'img/user.png' || "/default-profile.png"}
              alt="Profile"
              style={styles.profileImage}
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>
              Name: {" "}
              <span
              onClick={() => navigator.clipboard.writeText(service.seller.name)}
              style={styles.copyIcon}
              >
                {service.seller.name || "Not Availible"}
                </span>
            </p>
            <p>
              Phone:{" "}
              <span
                onClick={() => navigator.clipboard.writeText(service.seller.phone)}
                style={styles.copyIcon}
              >
                
                {service.seller.phone || "Not Available"}
              </span>
            </p>
            <p>
              Email:{" "}
              <span
                onClick={() => navigator.clipboard.writeText(service.seller.email)}
                style={styles.copyIcon}
              >
                {service.seller.email || "Not Available"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  },
  sellButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  categoryRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  categoryButton: {
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  selectedCategoryButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  searchContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  selectBox: {
    padding: "10px",
    fontSize: "16px",
    width: "50%",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  copyIcon: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Services;
