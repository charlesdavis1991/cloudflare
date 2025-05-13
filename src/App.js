import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubdomainList from "./components/Subdomain/SubdomainList";
import Charter from "./components/Charter/Charter";
import ChaterSun from "./components/CharterSun/ChaterSun";
import ChaterCity from "./components/CharterCity/ChaterCity";
import ChaterSnow from "./components/CharterSnow/ChaterSnow";
import LastMinute from "./components/LastMinute/LastMinute";
import Navbar from "./components/Navbar/Navbar";
import CreateLeaderBoard from "./components/CreateLeaderBoard/CreateLeaderBoard";
//import AddSubdomainForm from "./components/AddSubdomainForm/AddSubdomainForm";
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

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Navbar  style={{width:"250px"}}/>
          <Routes >
            <Route path="/widget/create-toplist" element={<SubdomainList />} />
            <Route path="/toplist-example-charter" element={<Charter />} />
            <Route path="/" element={<Charter />} />
            <Route path="/toplist-example-charter-sun" element={<ChaterSun />} />
            <Route path="/toplist-example-charter-city" element={<ChaterCity />} />
            <Route path="/toplist-example-charter-snow" element={<ChaterSnow />} />
            <Route path="/toplist-example-last_minute" element={<LastMinute />} />
            <Route path="/toplist-example-charter-air" element={< ChaterSnow />} />
            <Route path="/create-toplist" element={<CreateLeaderBoard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;