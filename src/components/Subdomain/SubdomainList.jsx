import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubdomainList.css"; // Import CSS for styling

const SubdomainList = () => {
  const [subdomains, setSubdomains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubdomains = async () => {
      try {
        const response = await axios.get("/api/cloudflare/dns_records", {
          headers: {
            Authorization: `Bearer mNAAjcm3GMTb9BDLb-i9bDhUC9GWp-WqWMOmvW3F`,
          },
        });
        setSubdomains(response.data.result);
        console.log("Subdomains fetched:", response.data.result);
      } catch (error) {
        console.error("Error fetching subdomains:", error);
      }
    };

    fetchSubdomains();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cloudflare/dns_records/${id}`, {
        headers: {
          Authorization: `Bearer mNAAjcm3GMTb9BDLb-i9bDhUC9GWp-WqWMOmvW3F`,
        },
      });
      setSubdomains(subdomains.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Error deleting subdomain:", error);
    }
  };

  return (
    <div className="subdomain-list-container">
      <h2>Subdomain List</h2>
     
      <table className="subdomain-table">
        <thead>
          <tr>
            <th>Subdomain</th>
            <th>IP Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subdomains.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.content}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(record.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      <button className="add-subdomain-button" onClick={() => navigate("/add")}>
        Add Subdomain
      </button>
    </div>
  );
};

export default SubdomainList;