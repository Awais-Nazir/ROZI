import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AddService from './components/AddService';
// import ServiceList from './components/ServiceList';
import Services from './components/Services';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar is rendered for all pages */}
        <Routes>
          {/* Routes for various pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/add-service" element={<AddService />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
