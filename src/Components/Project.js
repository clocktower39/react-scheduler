import React, { Component } from 'react'
import { Button, Input, Paper, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import Icon from 'awesome-react-icons';

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
    iconContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    hide: {
        display: 'none',
    },
    unassignedAgent: {
        color: '#c51162'
    },
    input: {
        textAlign: 'center'
    }
  });

class Project extends Component {
    constructor(props){
        super(props);

        this.isAgentAssigned = this.isAgentAssigned.bind(this);
    }
    isAgentAssigned = (classes) => this.props.agent === "Unassigned" ? classes.unassignedAgent : null;

    render() {
        const { classes } = this.props;
        return (
        <Grid style={{order: this.props.order}} className={classes.root} container item xs={12} sm={6} md={4} lg={3}>
            <Paper className={classes.paper} >
                {(!this.props.editMode)?(<Typography variant={'body1'}>{this.props.projectName}</Typography>):(<><TextField className={classes.input} placeholder='Task Name' value={this.props.projectName} /><br /><Input placeholder='Load Score' /></>)}
                <Typography variant={'body1'} className={this.isAgentAssigned(classes)}>
                    {this.props.agent}
                </Typography>
                <div className={(this.props.editMode)?classes.iconContainer:classes.hide}>
                    <Button onClick={this.props.higherPriority}><Icon name="arrow-left" /></Button>
                    <Button onClick={this.props.removeTask}><Icon name="trash" /></Button>
                    <Button onClick={this.props.lowerPriority}><Icon name="arrow-right" /></Button>
                </div>
            </Paper>
        </Grid>
        )
    }
}

export default withStyles(styles)(Project);