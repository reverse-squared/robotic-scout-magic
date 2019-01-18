import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, redirectTo } from '@reach/router';

import { AppBar as MUIAppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import SVGBack from '@material-ui/icons/ArrowBack';

class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorMenuEl: null
        };
        this.handleBack = () => {
            this.navigate('/');
        };
    }
    render() { 
        return <Location>
            {({location, navigate}) => {
                this.navigate = navigate;

                const showBackBtn = location.pathname !== '/';
                return <div>
                    <MUIAppBar position='static' color='primary'>
                        <Toolbar>
                            {
                                showBackBtn
                                && <IconButton
                                    onClick={this.handleBack}
                                    color="inherit"
                                >
                                    <SVGBack />
                                </IconButton>
                            }
                            <Typography variant='h6' color='inherit'>
                                Robotic Scout Magic
                            </Typography>
                        </Toolbar>
                    </MUIAppBar>
                </div>;
            }}
        </Location>;
        
    }
}
 
export default hot(AppBar);