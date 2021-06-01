import React from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Shuffle, Edit, Cached as Reset } from '@material-ui/icons';
import { connect, useDispatch } from 'react-redux';
import { editToggle, resetAssignments, assignTask, shuffleThenSortArr } from '../Redux/actions';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#37464f",
    zIndex: 1200,
  },
  btnOptions: {
    margin: "0 5px",
  },
});

function Footer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
    return (
      <AppBar className={classes.root} position="relative" id="footer">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"></IconButton>
          <Typography variant="caption" color="inherit">
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={()=>{
                props.agents.forEach((agent, index) => {
                  dispatch(resetAssignments(index))
                })}}
            >
              <Reset />
            </Button>
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={()=>{
                props.agents.forEach((agent, index) => {
                  dispatch(resetAssignments(index))
                })

                props.tasks.forEach((task,taskIndex) => {

                  for(let agentIndex = 0; agentIndex < props.agents.length; agentIndex++){
                    dispatch(shuffleThenSortArr(props.agents));
                    if(props.agents[agentIndex].load + task.loadScore <= 15 && props.agents[agentIndex].available === true && props.agents[agentIndex].programs.includes(task.associatedProgram)){

                      dispatch(assignTask(agentIndex, taskIndex))
                        break;
                    }
                  }
                })
              }}
            >
              <Shuffle />
            </Button>
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={()=>dispatch(editToggle({}))}
            >
              <Edit />
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
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

export default connect(mapStateToProps)(Footer);