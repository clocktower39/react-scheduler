import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCardToggle } from "../Redux/actions";
import {
  Toolbar,
  Typography,
  Tooltip,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { Add, Person, Assignment } from "@material-ui/icons";
import Modal from './Modal';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#37464f",
  },
});

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cardToggle = useSelector((state) => state.flipCardToggle);

  const handleFabClick = () => dispatch(flipCardToggle());

  return (
    <Toolbar className={classes.root}>
      <Fab onClick={handleFabClick} className={classes.addIcon} size="small">
        {cardToggle ? <Person /> : <Assignment />}
      </Fab>
      <Typography variant={"h5"}>Schedule Generator</Typography>
<Modal/>
    </Toolbar>
  );
}
