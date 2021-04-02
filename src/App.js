import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Components/Navbar";
import AgentDrawer from "./Components/AgentDrawer";
import ProjectAssignments from "./Components/ProjectAssignments";
import Footer from "./Components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <div className="container">
          <AgentDrawer />
          <ProjectAssignments />
        </div>

        <Footer /> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    agents: state.agents,
    tasks: state.tasks,
    editMode: state.editMode,
    left: state.left,
  };
};
export default connect(mapStateToProps)(App);