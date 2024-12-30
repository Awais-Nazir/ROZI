import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/add-service">Add Service</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
