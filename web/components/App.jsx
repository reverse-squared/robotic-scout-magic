// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import { hot } from 'react-hot-loader';
// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// Pages
import MainPage from './MainPage';
import FormPage from './FormPage';

import '../css/App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            formData: [
                {
                    id: 'test',
                    contents: [
                        { type: 'text', label: 'name' },
                        { type: 'text', label: 'Test' },
                        { type: 'text', label: 'something else' },
                    ]
                }
            ]
        };
    }
    render() { 
        return <div>
            <AppBar position='static' color='default'>
                <Toolbar>
                    <Typography variant='h6' color='inherit'>
                        Robotics Magic
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router>
                <MainPage path="/" />
                <FormPage path="/form/:form" formData={this.state.formData} />
            </Router>
        </div>;
    }
}
 
export default hot(module)(App);
