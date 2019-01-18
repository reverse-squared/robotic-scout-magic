import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, redirectTo } from '@reach/router';

import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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