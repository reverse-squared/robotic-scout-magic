// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import Theme from './Theme';
// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SVGMenu from '@material-ui/icons/Menu';
// Pages
import MainPage from './MainPage';
import FormPage from './FormPage';

import '../css/App.css';

const RouterLoading = Loadable({
    loader: () => fetch('./all-forms.json').then(res => res.json()).then(json => {
        return () => <Router>
            <MainPage path="/" formData={json} />
            <FormPage path="/form/:form" formData={json} />
        </Router>;
    }),
    loading: () => <div>Loading Data...</div>,
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            anchorMenuEl: null
        };
        this.handleMenu = event => {
            this.setState({ anchorMenuEl: event.currentTarget });
        };
        this.handleClose = () => {
            this.setState({ anchorMenuEl: null });
        };
    }
    render() {
        const { anchorMenuEl } = this.state;
        const open = Boolean(anchorMenuEl);

        return <Theme>
            <AppBar position='static' color='primary'>
                <Toolbar>
                    <Typography variant='h6' color='inherit'>
                        Robotics Magic
                    </Typography>
                    <div style={{flexGrow: '1'}}></div>
                    <div>
                        <IconButton
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
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <RouterLoading />
        </Theme>;
    }
}
 
export default hot(module)(App);
