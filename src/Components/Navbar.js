import React from "react";
import {
  Toolbar,
  Typography,
  Tooltip,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { Add, PersonSharp } from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { leftToggle } from '../Redux/actions';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#37464f",
  },
  addIcon: {},
});

export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
      <Toolbar className={classes.root}>
        <Fab
          onClick={()=>dispatch(leftToggle({}))}
          className={classes.addIcon}
          size="small"
        >
          <PersonSharp />
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