import React, { Component } from "react";
import {
  Button,
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
  taskBottomIcons: {
    color: 'white',
  },
});

class Project extends Component {
  constructor(props) {
    super(props);

    this.isAgentAssigned = this.isAgentAssigned.bind(this);
  }
  isAgentAssigned = (classes) =>
    this.props.agent === "Unassigned" ? classes.unassignedAgent : null;

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
              <Typography variant={"h5"}>{this.props.projectName}</Typography>
              <Divider />
              <Typography
                variant={"body1"}
                className={this.isAgentAssigned(classes)}
              >
                {this.props.agent}
              </Typography>
            </>
          ) : (
            <>
              <TextField
                className={classes.input}
                label="Task Name"
                defaultValue={this.props.projectName}
              />
              <br />
              <TextField
                className={classes.input}
                label="Load Score"
                defaultValue={this.props.taskLoadScore}
              />
            </>
          )}
          <div
            className={
              this.props.editMode ? classes.iconContainer : classes.hide
            }
          >
            <Button className={classes.taskBottomIcons} onClick={this.props.higherPriority}>
              <Icon name="arrow-left" />
            </Button>
            <Button className={classes.taskBottomIcons} onClick={this.props.removeTask}>
              <Icon name="trash" />
            </Button>
            <Button className={classes.taskBottomIcons} onClick={this.props.lowerPriority}>
              <Icon name="arrow-right" />
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Project);