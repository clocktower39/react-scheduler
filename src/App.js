import React from 'react'
import Drawer from "./Components/Drawer";
import Footer from "./Components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Drawer />
      </div>

      <Footer /> 
    </div>
  )
}
