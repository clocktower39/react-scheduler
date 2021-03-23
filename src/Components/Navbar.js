import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  Tooltip,
  Fab,
  withStyles,
} from "@material-ui/core";
import { Add, CodeSharp } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#37464f",
  },
  addIcon: {},
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.root}>
        <Fab
          onClick={this.props.handleDrawerToggle()}
          className={classes.addIcon}
          size="small"
        >
          <CodeSharp />
        </Fab>

        <Typography variant={"h5"}>Schedule Generator</Typography>

        <Tooltip title="Add task" aria-label="add">
          <Fab className={classes.addIcon} size="small" color="secondary">
            <Add />
          </Fab>
        </Tooltip>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(Navbar);
