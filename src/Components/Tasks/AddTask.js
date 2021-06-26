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

    const handleChange = (e, setter) => {
        setter(e.target.value);
      };
    
      const handleAdd = () => {
        if(taskName && taskLoad && taskAssociatedProgram){
          dispatch(
            addTask({
              task: taskName,
              loadScore: Number(taskLoad),
              associatedProgram: taskAssociatedProgram,
            })
          ).then(()=>{
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
      </>
    )
}
