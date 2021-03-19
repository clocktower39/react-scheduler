import React, { Component } from 'react'
import { Container, Grid, Box, Button } from '@material-ui/core';
import Project from './Project';
import { agents, tasks } from '../store';

export default class ProjectAssignments extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [...tasks],
            agents: [...agents]
        }
        this.handleShuffle = this.handleShuffle.bind(this);
    }
    handleShuffle = () => {
        this.state.tasks.forEach((task, index) => {
            for(let i = 0; i < this.state.agents.length; i++){
                if(this.state.agents[i].available === true){
                    this.setState((state, props)=>{
                        const updatedTasks = () => {
                            state.tasks[index].assignedAgent = state.agents[i].firstName;
                            return [...state.tasks]
                        }
                        const updatedAgents = () => {
                            state.agents[i].available = false;
                            state.agents[i].assignedJobs.push(task);
                            return [...state.agents]
                        }
                        console.log(updatedTasks());
                        console.log(updatedAgents());
                        return {
                            tasks: updatedTasks(),
                            agents: updatedAgents()
                        }
                    })
                }
            }
        })
    }
    render() {
        return (
            <Container className="container" maxWidth="lg" spacing={3}>
                <Box display="block" overflow="" style={{height: '100%', padding: 0, margin: 0}}>
                <Grid
                    container
                    spacing={3}
                    style={{ flexGrow: 1, padding: "15px" }}
                >
                    {this.state.tasks.map(task => <Project key={task.task} projectName={task.task} agent={task.assignedAgent} />)}
                </Grid>
                    <Button variant="contained" color="secondary" onClick={this.handleShuffle}>Shuffle</Button>
                </Box>
            </Container>
        )
    }
}
