import React from "react";
import Navbar from "./Components/Navbar";
import TileContainer from "./Components/TileContainer";
import Footer from "./Components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TileContainer />
      </div>
      <Footer />
    </div>
  );
}
