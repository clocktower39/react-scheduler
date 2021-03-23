import React, { Component } from 'react';
import { Toolbar, Typography } from '@material-ui/core';

export default class Navbar extends Component {
    render() {
        return (
            <Toolbar className="toolbar">
                <Typography variant={'h4'}>
                    Schedule Generator
                </Typography>
            </Toolbar>
        )
    }
}
