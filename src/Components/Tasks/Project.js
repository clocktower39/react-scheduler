import React from "react";
import {
  Button,
  Divider,
  Paper,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Icon from "awesome-react-icons";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      backgroundColor: "#3f51b5",
      alignItems: "stretch",
      width: "100%",
      color: "white",
    },
    iconContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    input: {
      "& input": {
        color: "white",
      },
      "& label": {
        color: "white",
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },
    },
    hide: {
      display: "none",
    },
    unassignedAgent: {
      color: "#000000",
    },
    taskBottomIcons: {
      color: 'white',
    },
}))

export default function Project(props) {
    const classes = useStyles();

    const isAgentAssigned = (classes) => props.agent === "Unassigned" ? classes.unassignedAgent : null;
    
    return (
        <Grid
          style={{ order: props.order }}
          className={classes.root}
          container
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
        >
          <Paper className={classes.paper}>
            {!props.editMode ? (
              <>
                <Typography variant={"h5"}>{props.projectName}</Typography>
                <Divider />
                <Typography
                  variant={"body1"}
                  className={isAgentAssigned(classes)}
                >
                  {props.agent}
                </Typography>
              </>
            ) : (
              <>
                <TextField
                  className={classes.input}
                  label="Task Name"
                  value={props.projectName}
                  onChange={(e)=>props.onProjectNameChange(e.target.value)}
                />
                <br />
                <TextField
                  className={classes.input}
                  label="Load Score"
                  value={props.taskLoadScore}
                  onChange={(e)=>props.onTaskLoadScoreChange(e.target.value)}
                />
                <br />
                <TextField
                  className={classes.input}
                  label="Associated Program"
                  value={props.task.associatedProgram}
                  onChange={(e)=>props.onAssociatedProgramChange(e.target.value)}
                />
              </>
            )}
            <div
              className={
                props.editMode ? classes.iconContainer : classes.hide
              }
            >
              <Button className={classes.taskBottomIcons} onClick={props.higherPriority}>
                <Icon name="arrow-left" />
              </Button>
              <Button className={classes.taskBottomIcons} onClick={props.removeTask}>
                <Icon name="trash" />
              </Button>
              <Button className={classes.taskBottomIcons} onClick={props.lowerPriority}>
                <Icon name="arrow-right" />
              </Button>
            </div>
          </Paper>
        </Grid>
    )
}
