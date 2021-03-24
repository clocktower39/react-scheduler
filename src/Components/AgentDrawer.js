import React, { Component } from "react";
import {
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
              <IconButton><Cancel onClick={this.props.toggleDrawer()} /></IconButton>
              <List className={classes.list}>
                {this.props.agents.map((agent) => (
                  <ListItem
                    button
                    key={agent.lastName}
                  >
                    <ListItemIcon>
                      <PersonSharp />
                    </ListItemIcon>
                    <ListItemText primary={agent.load} />
                    <ListItemText primary={`${agent.firstName} ${agent.lastName}`}/>
                    <List>
                        {agent.programs.map(program => (
                          <ListItem>{program}</ListItem>
                        ))}
                    </List>
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
