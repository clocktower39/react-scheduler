import React, { Component } from 'react';
import {
    TableCell,
    TableRow,
 } from '@material-ui/core/';

export default class AgentInfo extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{`${this.props.agent.firstName} ${this.props.agent.lastName}`}</TableCell>
                <TableCell>{this.props.agent.load}</TableCell>
                <TableCell>{this.props.agent.available.toString()}</TableCell>
                <TableCell>Arrow</TableCell>
            </TableRow>
        )
    }
}
