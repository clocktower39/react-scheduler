import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Box } from "@material-ui/core";
import Project from "./Project";
import Agent from "./Agent";
import { useDispatch } from 'react-redux';
import { removeTask, removeAgent, lowerPriority, higherPriority } from '../Redux/actions';

function ProjectAssignments(props) {

  const dispatch = useDispatch();
    return (
      <Container maxWidth="lg" spacing={3}>
        <Box display="block" style={{ height: "100%", padding: 0, margin: 0 }}>
          <Grid container spacing={3} style={{ flexGrow: 1, padding: "15px" }}>
            {props.flipCardToggle?
            props.tasks.map((task) => (
              <Project
                key={`${task.task}-${task.assignedAgent}`}
                order={task.priority}
                taskLoadScore={task.loadScore}
                editMode={props.editMode}
                projectName={task.task}
                agent={task.assignedAgent}
                removeTask={() => {
                  dispatch(removeTask(task.priority));
                }}
                lowerPriority={() => {
                  dispatch(lowerPriority(task.priority));
                }}
                higherPriority={() => {
                  dispatch(higherPriority(task.priority));
                }}
              />
            )):
            props.agents.map((agent, agentIndex) => (
              <Agent
                key={`${agent.lastName}-${agent.load}`}
                agent={agent}
                editMode={props.editMode}
                removeAgent={() => {
                  dispatch(removeAgent(agentIndex));
                }}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    );
}
const mapStateToProps = state => {
  return {
    agents: [...state.agents],
    tasks: [...state.tasks],
    editMode: state.editMode,
    flipCardToggle: state.flipCardToggle,
  };
};

export default connect(mapStateToProps)(ProjectAssignments);