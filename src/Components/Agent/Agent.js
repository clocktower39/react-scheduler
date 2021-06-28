import React from "react";
import {
  Button,
  IconButton,
  Checkbox,
  Divider,
  Paper,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { RemoveCircle, AddCircle } from "@material-ui/icons";
import Icon from "awesome-react-icons";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '7.5px',
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
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
  hide: {
    display: "none",
  },
  unassignedAgent: {
    color: "#000000",
  },
  trashIcon: {
    color: "white",
  },
});

export default function Agent(props) {
  const classes = useStyles();

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
            <Typography
              variant={"h5"}
              style={!props.agent.available ? { color: "red" } : null}
            >
              {props.agent.firstName} {props.agent.lastName}
            </Typography>
            <Divider />
            {props.agent.assignedJobs.length > 0 ? (
              props.agent.assignedJobs.map((job) => (
                <Typography key={job} variant={"body1"}>
                  {job}
                </Typography>
              ))
            ) : (
              <Typography
                variant={"body1"}
                className={classes.unassignedAgent}
              >
                Unassigned
              </Typography>
            )}
          </>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="First Name"
                defaultValue={props.agent.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Last Name"
                defaultValue={props.agent.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Available:
                <Checkbox
                  onClick={props.changeAvailability}
                  checked={props.agent.available}
                  defaultValue={props.agent.lastName}
                />
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              {props.agent.programs.map((program) => (
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="body1">{program}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton onClick={props.removeProgram}>
                      <RemoveCircle />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}><IconButton><AddCircle /></IconButton></Grid>
            </Grid>
          </Grid>
        )}
        <div
          className={
            props.editMode ? classes.iconContainer : classes.hide
          }
        >
          <Button onClick={props.removeAgent}>
            <Icon className={classes.trashIcon} name="trash" />
          </Button>
        </div>
      </Paper>
    </Grid>
  )
}
