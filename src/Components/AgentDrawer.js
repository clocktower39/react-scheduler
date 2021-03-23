import React, { Component } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonSharp } from "@material-ui/icons";

const styles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

class AgentDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <React.Fragment key={"left"}>
          <Drawer anchor={"left"} open={this.props.isLeftOpen}>
            <div role="presentation">
              <List className={classes.list}>
                {this.props.agents.map((agent) => (
                  <ListItem
                    button
                    key={agent.lastName}
                    onClick={this.props.toggleDrawer()}
                  >
                    <ListItemIcon>
                      <PersonSharp />
                    </ListItemIcon>
                    <ListItemText primary={agent.firstName} />
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
