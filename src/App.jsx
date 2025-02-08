import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Removed extra BrowserRouter
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Favorites from "./pages/Favorites.jsx";
import CustomNavbar from "./components/Navbar.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CustomNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites searchQuery={searchQuery} />} />
      </Routes>
    </>
  );
}

export default App;
