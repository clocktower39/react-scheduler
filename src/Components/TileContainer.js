import React from "react";
import { connect, useDispatch } from "react-redux";
import { Container, Grid, Box } from "@material-ui/core";
import Project from "./Tasks/Project";
import Agent from "./Agent/Agent";
import {
  removeTask,
  removeAgent,
  lowerPriority,
  higherPriority,
  toggleAvailable,
} from "../Redux/actions";

function TileContainer(props) {
  const dispatch = useDispatch();
  return (
    <Container maxWidth="lg" spacing={3}>
      <Box display="block" style={{ height: "100%", padding: 0, margin: 0 }}>
        <Grid container spacing={3} style={{ flexGrow: 1, padding: "15px" }}>
          {props.flipCardToggle
            ? props.tasks.map((task) => (
                <Project
                  key={`${task.task}-${task.assignedAgent}`}
                  order={task.priority}
                  taskLoadScore={task.loadScore}
                  editMode={props.editMode}
                  projectName={task.task}
                  agent={task.assignedAgent}
                  task={task}
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
              ))
            : props.agents
                .sort((a, b) => b.firstName < a.firstName)
                .map((agent, agentIndex) => (
                  <Agent
                    key={`${agent.lastName}-${agent.load}`}
                    agent={agent}
                    index={agentIndex}
                    editMode={props.editMode}
                    removeAgent={() => {
                      dispatch(removeAgent(agentIndex));
                    }}
                    changeAvailability={()=>{
                      dispatch(toggleAvailable(agentIndex))
                    }}
                  />
                ))}
        </Grid>
      </Box>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    agents: [...state.agents],
    tasks: [...state.tasks],
    editMode: state.editMode,
    flipCardToggle: state.flipCardToggle,
  };
};

export default connect(mapStateToProps)(TileContainer);
