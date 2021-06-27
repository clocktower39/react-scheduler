import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCardToggle } from "../Redux/actions";
import {
  Toolbar,
  Typography,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { Person, Assignment } from "@material-ui/icons";
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
    <Toolbar className={classes.root} title={cardToggle?"Toggle to Agents":"Toggle to Tasks"}>
      <Fab onClick={handleFabClick} className={classes.addIcon} size="small">
        {cardToggle ? <Person /> : <Assignment />}
      </Fab>
      <Typography variant={"h5"}>Schedule Generator</Typography>
      <Modal cardToggle={cardToggle} />
    </Toolbar>
  );
}
