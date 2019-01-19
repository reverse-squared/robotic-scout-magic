import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Typography } from '@material-ui/core';

class Header extends Component {
    render() {
        const config = this.props.config;

        return <div style={{paddingTop: '20px'}}>
            <Typography variant='h5' style={{textDecoration: 'underline'}} color='inherit'>
                {config.label}
            </Typography>
            
            {config.description}
        </div>;
    }
}
 
export const id = 'header';
export default hot(Header);
