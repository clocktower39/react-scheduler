import React, { Component } from 'react'
import { Container, Grid, Box } from '@material-ui/core';
import Project from './Project';

export default class ProjectAssignments extends Component {
    render() {
        return (
            <Container className="container" maxWidth="lg" spacing={3}>
                <Box display="block" style={{height: '100%', padding: 0, margin: 0}}>
                    
                <Grid
                    container
                    spacing={3}
                    style={{ flexGrow: 1, padding: "15px" }}
                >
                    {this.props.tasks.map(task => <Project order={task.priority} lowerPriority={()=>{this.props.changePriority(task.priority, 'up')}} higherPriority={()=>{this.props.changePriority(task.priority, 'down')}} key={task.task} projectName={task.task} agent={task.assignedAgent} />)}
                </Grid>
                </Box>
            </Container>
        )
    }
}
