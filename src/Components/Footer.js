import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#37464f",
  },
  btnOptions: {
    margin: "0 5px",
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.root} position="relative" id="footer">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"></IconButton>
          <Typography variant="caption" color="inherit">
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={this.props.resetState}
            >
              Reset
            </Button>
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={this.props.shuffleSchedule}
            >
              Shuffle
            </Button>
            <Button
              className={classes.btnOptions}
              variant="contained"
              color="secondary"
              onClick={this.props.toggleEditMode}
            >
              Edit mode
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Footer);
