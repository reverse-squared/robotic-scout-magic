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
                            <div style={{ flexGrow: '1' }}></div>
                            <div>
                                {/* <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <SVGMenu />
                                </IconButton>                    
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorMenuEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>this doesnt get filled out yet</MenuItem>
                                    <MenuItem onClick={this.handleClose}>this doesnt get filled out yet</MenuItem>
                                    <MenuItem onClick={this.handleClose}>this doesnt get filled out yet</MenuItem>
                                </Menu> */}
                            </div>
                        </Toolbar>
                    </MUIAppBar>
                </div>;
            }}
        </Location>;
        
    }
}
 
export default hot(AppBar);