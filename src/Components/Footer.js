import React, { Component } from 'react'
import { Toolbar, Typography, AppBar, IconButton, Button } from '@material-ui/core';

export default class Footer extends Component {

    render() {
        return (
            <AppBar position="relative" id="footer">
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                >
                </IconButton>
                <Typography variant="caption" color="inherit">
                    <Button variant="contained" color="secondary" onClick={/*this.resetState*/this.props.resetState}>Reset</Button>
                    <Button variant="contained" color="secondary" onClick={/*this.handleShuffle*/this.props.shuffleSchedule}>Shuffle</Button>
                </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
