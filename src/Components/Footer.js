import React, { Component } from 'react'
import { Toolbar, Typography, AppBar, IconButton, Button } from '@material-ui/core';
import { agents, tasks } from '../store';

export default class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [...tasks],
            agents: [...agents]
        }
        this.handleShuffle = this.handleShuffle.bind(this);
    }
    handleShuffle = () => {

        this.setState(state => {
            const newTasks = state.tasks.map((item, i) => {
                
                item.assignedAgent = Math.floor(Math.random() * Math.floor(state.agents.length));
                return {
                    ...item,
                }
            });
            return {
                tasks: newTasks,
                agents: [...agents]
            }
        })
      
    }
    render() {
        return (
            <AppBar position="relative" id="footer">
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                >
                </IconButton>
                <Typography variant="title" color="inherit">
                    <Button variant="contained" color="secondary" onClick={null} >Shuffle</Button>
                </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
