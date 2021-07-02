import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addProgramToAgent, removeProgramFromAgent } from "../../Redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: "15px 0",
    textAlign: "center",
    backgroundColor: "#3f51b5",
    width: "100%",
    color: "white",
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
    color: theme.palette.grey[900]
  },
  RemoveCircle: {
    color: theme.palette.grey[900]
  },
  AddCircle: {
    color: theme.palette.secondary.main
  }
}));

export default function Agent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newProgram, setNewProgram] = useState("");

  const handleChange = (e) => {
    setNewProgram(e.target.value);
  };

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
              <Typography variant={"body1"} className={classes.unassignedAgent}>
                Unassigned
              </Typography>
            )}
          </>
        ) : (
          <Grid container spacing={3} direction="column">

            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="First Name"
                defaultValue={props.agent.firstName}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                className={classes.input}
                label="Last Name"
                defaultValue={props.agent.lastName}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography>
                Available:
                <Checkbox
                  onClick={props.changeAvailability}
                  checked={props.agent.available}
                  defaultValue={props.agent.lastName}
                />
              </Typography>
            </Grid>
            <Grid container item xs={12} >
              {props.agent.programs.map((program) => (
                <Grid container alignItems="center" key={program}>
                  <Grid item xs={2} />
                  <Grid item xs={6}>
                    <Typography variant="body1" align="left">
                      {program}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      onClick={() =>
                        dispatch(removeProgramFromAgent(program, props.agent))
                      }
                    >
                      <RemoveCircle className={classes.RemoveCircle}/>
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid container item xs={12} justify="center">
                <Grid item xs={2} />
                <Grid item xs={6}>
                  <TextField
                    label="Add a Program"
                    value={newProgram}
                    onChange={handleChange}
                    className={classes.input}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <IconButton
                    onClick={() =>
                      dispatch(addProgramToAgent(newProgram, props.agent)).then(
                        () => setNewProgram("")
                      )
                    }
                  >
                    <AddCircle className={classes.AddCircle} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button onClick={props.removeAgent} >
                <Icon className={classes.trashIcon} name="trash" />
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
}
