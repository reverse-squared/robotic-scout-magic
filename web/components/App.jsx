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
    }
    render() { 
        return <Theme>
            <AppBar position='static' color='primary'>
                <Toolbar>
                    <Typography variant='h6' color='inherit'>
                        Robotics Magic
                    </Typography>
                </Toolbar>
            </AppBar>
            <RouterLoading />
        </Theme>;
    }
}
 
export default hot(module)(App);
