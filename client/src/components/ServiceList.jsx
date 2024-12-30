import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/services");
                setServices(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <h1>Service List</h1>
            <ul>
                {services.map((service) => (
                    <li key={service._id}>{service.name} - {service.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;
