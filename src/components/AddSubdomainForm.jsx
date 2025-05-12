import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./AddSubdomainForm.css"; // Import CSS for styling
import axios from "axios";
import "./SubdomainList.css"; // Import CSS for styling
const AddSubdomainForm = () => {
  const [subdomain, setSubdomain] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/cloudflare/dns_records",
        {
          type: "A",
          name: subdomain,
          content: ipAddress,
          ttl: 3600,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_CLOUDFLARE_API_TOKEN`,
          },
        }
      );
      alert("Subdomain added successfully!");
    } catch (error) {
      console.error("Error adding subdomain:", error);
    }
  };

  return (
    <div className="add-subdomain-container">
 
      <form onSubmit={handleSubmit} className="add-subdomain-form">
        <div className="form-group">
          <label>Subdomain:</label>
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>IP Address:</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Subdomain
        </button>
      </form>
      <button
        className="back-button"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Back
      </button>
    </div>
  );
};

export default AddSubdomainForm;