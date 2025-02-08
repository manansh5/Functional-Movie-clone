import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure this is present


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Functional-Movie-clone"> {/* ✅ Set the basename */}
    <App />
  </BrowserRouter>
);
