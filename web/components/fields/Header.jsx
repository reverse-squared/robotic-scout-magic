import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Typography } from '@material-ui/core';

class Header extends Component {
    render() {
        const config = this.props.config;

        return <div>
            <Typography variant='h6' color='inherit'>
                {config.label}
            </Typography>
        </div>;
    }
}
 
export const id = 'header';
export default hot(Header);
