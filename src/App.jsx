import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./pages/Favorites";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CustomNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default App;
