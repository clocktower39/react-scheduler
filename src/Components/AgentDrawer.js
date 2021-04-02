import React from "react";
import {
  IconButton,
  Divider,
  Drawer,
  List,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import AgentInfo from "./AgentInfo";
import { connect, useDispatch } from 'react-redux';
import { leftToggle } from '../Redux/actions';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  fullList: {
    width: "auto",
  },
  closeBtnContainer: {
    display: 'flex',
    width: '100%',
  }
});

function AgentDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
    return (
      <div className={classes.root}>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={props.left} variant="persistent">
            <div role="presentation">
              <div className="closeBtnContainer">
                <IconButton onClick={()=>dispatch(leftToggle())}><Cancel/></IconButton>
              </div>
              <List className={classes.list}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Load</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell>Programs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.agents.sort((a, b) => a.firstName > b.firstName).map((agent,index) => (
                        <AgentInfo key={`${agent.firstName}${index}`} agent={agent} />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </List>
              <Divider />
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    agents: [...state.agents],
    tasks: [...state.tasks],
    editMode: state.editMode,
    left: state.left,
  };
};

export default connect(mapStateToProps)(AgentDrawer);