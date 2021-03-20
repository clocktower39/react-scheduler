import React, { Component } from 'react'
import { Paper, Grid, withStyles } from '@material-ui/core';


const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      backgroundColor: '#3f51b5',
      alignItems: "stretch",
      width: '100%',
      color: 'white'
    },
  });

class Project extends Component {
    render() {
        const { classes } = this.props;
        return (
        <Grid className={classes.root} container item xs={12} sm={4} md={3} lg={3}>
            <Paper item className={classes.paper} >{this.props.projectName}<br/>{this.props.agent}</Paper>
        </Grid>
        )
    }
}

export default withStyles(styles)(Project);