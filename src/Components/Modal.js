import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Grid,
  Tooltip,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AddTask from './Tasks/AddTask';
import AddAgent from './Agent/AddAgent';

function getModalStyle() {
  const top = 50;
  const left = 50;

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

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Grid container spacing={2} style={modalStyle} className={classes.paper}>
      {props.cardToggle?<AddTask />:<AddAgent />}
    </Grid>
  );

  return (
    <div>
      <Tooltip title={props.cardToggle?"Add New Task":"Add New Agent"}>
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
