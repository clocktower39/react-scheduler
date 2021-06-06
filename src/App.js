import React from 'react'
import Navbar from "./Components/Navbar";
import ProjectAssignments from "./Components/ProjectAssignments";
import Footer from "./Components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <ProjectAssignments />
      </div>

      <Footer /> 
    </div>
  )
}
