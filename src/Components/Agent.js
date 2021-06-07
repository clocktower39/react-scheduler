import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Paper,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Icon from "awesome-react-icons";

const styles = (theme) => ({
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
  trashIcon: {
    color: 'white',
  },
});

class Project extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        style={{ order: this.props.order }}
        className={classes.root}
        container
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
      >
        <Paper className={classes.paper}>
          {!this.props.editMode ? (
            <>
              <Typography variant={"h5"}>
                {this.props.agent.firstName} {this.props.agent.lastName}
              </Typography>
              <Divider />
              {this.props.agent.assignedJobs.length > 0 ? (
                this.props.agent.assignedJobs.map((job) => (
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
            <>
              <TextField
                className={classes.input}
                label="First Name"
                defaultValue={this.props.agent.firstName}
              />
              <br />
              <TextField
                className={classes.input}
                label="Last Name"
                defaultValue={this.props.agent.lastName}
              />
              <br />
              <Typography>Available: 
              <Checkbox
                checked={this.props.agent.available}
                defaultValue={this.props.agent.lastName}
              />
              </Typography>
              <br />
            </>
          )}
          <div
            className={
              this.props.editMode ? classes.iconContainer : classes.hide
            }
          >
            <Button onClick={this.props.removeAgent}>
              <Icon className={classes.trashIcon} name="trash" />
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Project);
