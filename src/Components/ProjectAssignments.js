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
        };

        this.shuffle = this.shuffle.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    resetState = () => {
        this.setState((state) => {
            const newTasks = state.tasks.map(task =>{
                task.assignedAgent = "Unassigned";
                task.assigned = false;
            });
            const newAgents = state.agents.map(agent =>{
                agent.load = 0;
                agent.available = true;
                agent.assignedJobs = [];
            });
            
            return {
                newTasks,
                newAgents
            }
        })
    }
    handleShuffle = () => {
        this.resetState();
        this.setState((state) => {
            let newTasks = [...state.tasks];
            let newAgents = [...state.agents];
        /* 
            loop through copy of tasks
            loop through the agents and if the agent is available, change available to false and push task to assignedJobs
            push to new agent array

        */
            newTasks.forEach((taskLoop, taskLoopIndex) => {
                newAgents = this.shuffle(newAgents);
                for(let agentLoopIndex = 0; newAgents.length > agentLoopIndex; agentLoopIndex++){
                    if(newAgents[agentLoopIndex].load + taskLoop.loadScore <= 15 && newAgents[agentLoopIndex].available === true && newAgents[agentLoopIndex].programs.includes(taskLoop.associatedProgram)){
                        newAgents[agentLoopIndex].load += taskLoop.loadScore;
                        newAgents[agentLoopIndex].assignedJobs.push(taskLoop);
                        taskLoop.assignedAgent = newAgents[agentLoopIndex].firstName;
                        break;
                    }
                }
            })
            return {
                newTasks,
                newAgents
            }
        })
    }
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
    render() {
        return (
            <Container className="container" maxWidth="lg" spacing={3}>
                <Box display="block" overflow="" style={{height: '100%', padding: 0, margin: 0}}>
                    <Button variant="contained" color="secondary" onClick={this.resetState}>Reset</Button>
                    
                    <Button variant="contained" color="secondary" onClick={this.handleShuffle}>Shuffle</Button>
                <Grid
                    container
                    spacing={3}
                    style={{ flexGrow: 1, padding: "15px" }}
                >
                    {this.state.tasks.map(task => <Project key={task.task} projectName={task.task} agent={task.assignedAgent} />)}
                </Grid>
                </Box>
            </Container>
        )
    }
}
