import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { addAgent } from "../../Redux/actions";
import { useDispatch } from "react-redux";


export default function AddTask() {
    const dispatch = useDispatch();
    const [agentFirstName, setAgentFirstName] = useState("");
    const [agentLastName, setAgentLastName] = useState("");
    const [programs, setPrograms] = useState([]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
      };
    
      const handleAdd = () => {
        if(agentFirstName && agentLastName && programs){
          dispatch(
            addAgent({
                firstName: agentFirstName,
                lastName: agentLastName
            })
          ).then(()=>{
            setAgentFirstName('');
            setAgentLastName('');
          });
        }
      };
    
    return (
        <>
        <Grid item xs={12} container justify="center" >
            <Typography variant="h5">Add a new agent</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            value={agentFirstName}
            onChange={(e) => handleChange(e, setAgentFirstName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            value={agentLastName}
            onChange={(e) => handleChange(e, setAgentLastName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Programs"
            value={programs}
            onChange={(e) => handleChange(e, setPrograms)}
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
