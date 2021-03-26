import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Box } from "@material-ui/core";
import Project from "./Project";

function ProjectAssignments(props) {

    return (
      <Container maxWidth="lg" spacing={3}>
        <Box display="block" style={{ height: "100%", padding: 0, margin: 0 }}>
          <Grid container spacing={3} style={{ flexGrow: 1, padding: "15px" }}>
            {props.tasks.map((task) => (
              <Project
                key={task.task}
                order={task.priority}
                taskLoadScore={task.loadScore}
                editMode={props.editMode}
                projectName={task.task}
                agent={task.assignedAgent}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    );
}
const mapStateToProps = state => {
  return {
    agents: state.agents,
    tasks: state.tasks,
    editMode: state.editMode,
    left: state.left,
  };
};

export default connect(mapStateToProps)(ProjectAssignments);