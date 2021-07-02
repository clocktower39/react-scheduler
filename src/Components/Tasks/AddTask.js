import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { addTask } from "../../Redux/actions";
import { useDispatch } from "react-redux";


export default function AddTask() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskLoad, setTaskLoad] = useState("");
  const [taskAssociatedProgram, setTaskAssociatedProgram] = useState("");

  const handleChange = (e, setter, type) => {
    console.log(e);
    console.log(setter);
    console.log(type);
    type === 'setTaskLoad' ? setter(e) : setter(e.target.value);
  };

  const handleAdd = () => {
    if (taskName && taskLoad && taskAssociatedProgram) {
      dispatch(
        addTask({
          task: taskName,
          loadScore: Number(taskLoad),
          associatedProgram: taskAssociatedProgram,
        })
      ).then(() => {
        setTaskName('');
        setTaskLoad('');
        setTaskAssociatedProgram('');
      });
    }
  };

  return (
    <>
      <Grid item xs={12} container justify="center" >
        <Typography variant="h5">Add a new task</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task"
          value={taskName}
          onChange={(e) => handleChange(e, setTaskName, 'setTaskName')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Load"
          type="number"
          value={taskLoad}
          onChange={(e) => {
            //only allow digits, not working currently
            e.preventDefault();
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            console.log(onlyNums)
            handleChange(onlyNums, setTaskLoad, 'setTaskLoad');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Associated Program"
          value={taskAssociatedProgram}
          onChange={(e) => handleChange(e, setTaskAssociatedProgram, 'setTaskAssociatedProgram')}
        />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button onClick={handleAdd} variant="outlined">
          Add
        </Button>
      </Grid>
    </>
  )
}
