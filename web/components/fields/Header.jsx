import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
    render() {
        const config = this.props.config;

        return <div style={{paddingTop: '20px', paddingBottom: '5px'}}>
            <Typography variant='h5' style={{textDecoration: 'underline'}} color='inherit'>
                {config.label}
            </Typography>
            
            {
                config.description &&
                    <div style={{paddingTop: '5px', opacity: '0.7'}}>
                        {config.description}
                    </div>
            }
        </div>;
    }
}
 
export const id = 'header';
export default hot(Header);