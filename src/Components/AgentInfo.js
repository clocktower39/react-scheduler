import React, { Component } from 'react';
import {
    Checkbox,
    TableCell,
    TableRow,
 } from '@material-ui/core/';

export default class AgentInfo extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{`${this.props.agent.firstName} ${this.props.agent.lastName}`}</TableCell>
                <TableCell>{this.props.agent.load}</TableCell>
                <TableCell><Checkbox color="primary" checked={this.props.agent.available}/></TableCell>
                <TableCell>{this.props.agent.programs.length}</TableCell>
            </TableRow>
        )
    }
}
