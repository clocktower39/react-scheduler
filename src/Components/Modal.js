import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Button,
  Grid,
  TextField,
  Tooltip,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { addTask } from "../Redux/actions";
import { useDispatch } from "react-redux";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "black",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskLoad, setTaskLoad] = useState("");
  const [taskAssociatedProgram, setTaskAssociatedProgram] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleAdd = () => {
    dispatch(
      addTask({
        task: taskName,
        loadScore: taskLoad,
        associatedProgram: taskAssociatedProgram,
      })
    );
  };

  const body = (
    <Grid container spacing={2} style={modalStyle} className={classes.paper}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task"
          value={taskName}
          onChange={(e) => handleChange(e, setTaskName)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Load"
          value={taskLoad}
          onChange={(e) => handleChange(e, setTaskLoad)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Associated Program"
          value={taskAssociatedProgram}
          onChange={(e) => handleChange(e, setTaskAssociatedProgram)}
        />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button onClick={handleAdd} variant="outlined">
          Add
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Tooltip>
        <Fab
          className={classes.addIcon}
          size="small"
          color="secondary"
          onClick={handleOpen}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
