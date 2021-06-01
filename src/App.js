import React, { Component } from "react";
import { connect } from "react-redux";
import Drawer from "./Components/Drawer";
import Footer from "./Components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Drawer />
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
  };
};
export default connect(mapStateToProps)(App);