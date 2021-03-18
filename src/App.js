import './App.css';

import React from 'react';
import { Toolbar } from '@material-ui/core';
import ProjectAssignments from './Components/ProjectAssignments';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Toolbar className="toolbar">Schedule Generator</Toolbar>

      <ProjectAssignments />

      <Footer />
      
    </div>
  );
}

export default App;