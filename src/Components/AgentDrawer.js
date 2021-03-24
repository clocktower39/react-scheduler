import React, { Component } from "react";
import {
  Button,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonSharp, Cancel } from "@material-ui/icons";

const styles = makeStyles({
  fullList: {
    width: "auto",
  },
  closeDrawerIcon: {
    
  }
});

class AgentDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={this.props.isLeftOpen}>
            <div role="presentation">
              <Button>Show All</Button>
              <IconButton onClick={this.props.toggleDrawer()} className={classes.closeDrawerIcon}><Cancel/></IconButton>
              <List className={classes.list}>
                {this.props.agents.map((agent) => (
                  <ListItem
                    button
                    key={agent.lastName}
                  >
                    <ListItemIcon><PersonSharp /></ListItemIcon>
                    <ListItemText primary={`${agent.firstName} ${agent.lastName}`}/>
                    {/* <ListItemText primary={'Programs'}>
                    <List>
                        {agent.programs.map(program => (
                          <ListItem>{program}</ListItem>
                        ))}
                    </List>
                    </ListItemText>
                    <ListItemText primary={agent.load} /> */}
                    <List>

                    </List>
                  </ListItem>
                ))}
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
