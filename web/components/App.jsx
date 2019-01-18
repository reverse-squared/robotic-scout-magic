// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component, Fragment } from 'react';
import { Router, createHistory, LocationProvider } from '@reach/router';
import { hot } from 'react-hot-loader/root';
import Theme from './Theme';
import createHashSource from 'hash-source';
import { AppLoadable, PageLoadable } from './Loader';

import AppBar from './AppBar';

import '../css/App.css';

// Create Hash Routing History
const hashSource = createHashSource();
const history = createHistory(hashSource);

// Loadable Pages
const MainPage = PageLoadable(() => import('./MainPage'));
const FormPage = PageLoadable(() => import('./FormPage'));

// Main App Component, passed a formData prop.
class App extends Component {
    constructor() {
        super();
    }
    render() {
        const formData = this.props.formData;
        return <Fragment>
            <LocationProvider history={history}>
                <AppBar formData={formData} />
                <div className='container'>
                    <Router>
                        <MainPage path='/' formData={formData} />
                        <FormPage path='/form/:formID' formData={formData} />
                    </Router>
                </div>
            </LocationProvider>
        </Fragment>;
    }
}

// Use the AppLoadable to create a loading screen for loading
// the form data.
const PreLoadedApp = () => <Theme>
    {React.createElement(AppLoadable(App)) }
</Theme>;
 
export default hot(PreLoadedApp);
