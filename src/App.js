import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubdomainList from "./components/SubdomainList";
import AddSubdomainForm from "./components/AddSubdomainForm";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app-header">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Cloudflare Logo"
            className="h-16 w-16"
          />
        </div>
 
        
        <h1 >Cloudflare Subdomain Admin</h1>
        <Routes>
          <Route path="/" element={<SubdomainList />} />
          <Route path="/add" element={<AddSubdomainForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;