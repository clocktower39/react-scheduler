import React, { Component } from "react";
import {
  Button,
  IconButton,
  Divider,
  Drawer,
  List,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel } from "@material-ui/icons";
import AgentInfo from "./AgentInfo";
// fix close button to right side
const styles = makeStyles({
  root: {
    position: 'relative',
  },
  fullList: {
    width: "auto",
  },
  closeBtnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  }
});

class AgentDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={this.props.isLeftOpen} variant="persistent">
            <div role="presentation">
              <div className="closeBtnContainer">
                <IconButton onClick={this.props.toggleDrawer()}><Cancel/></IconButton>
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
                      {this.props.agents.map((agent) => (
                        <AgentInfo agent={agent} />
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
}

export default withStyles(styles)(AgentDrawer);
