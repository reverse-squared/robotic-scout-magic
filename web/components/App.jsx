// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component, Fragment } from 'react';
import { Router, createHistory, LocationProvider, Location } from '@reach/router';
import { hot } from 'react-hot-loader/root';
import Theme from './Theme';
import createHashSource from 'hash-source';
import { AppLoadable, PageLoadable } from './Loader';

import AppBar from './AppBar';
import Snackbar from '@material-ui/core/Snackbar';

import '../css/App.css';

// Create Hash Routing History
const hashSource = createHashSource();
const history = createHistory(hashSource);

// Loadable Pages
const MainPage = PageLoadable(() => import('./MainPage'));
const FormPage = PageLoadable(() => import('./FormPage'));
const ExportPage = PageLoadable(() => import('./ExportPage'));
const NotFoundPage = PageLoadable(() => import('./NotFoundPage'));

// Main App Component, passed a formData prop.
class App extends Component {
    constructor() {
        super();
        this.state = {
            snackbarOpen: false,
        };
        this.handleFormSubmit = (formId, formData) => {
            this.navigate('/');

            fetch('/submit/' + formId, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            }).then(x => {
                if (x.status === 200) {
                    this.setState({ snackbarOpen: true });
                }
            });
        };
        this.handleSnackbarClose = () => {
            this.setState({ snackbarOpen: false });
        };
    }
    render() {
        const { formData, usbData } = this.props;
        return <Fragment>
            <LocationProvider history={history}>
                <Location>
                    {({navigate}) => { this.navigate = navigate; return null; }}
                </Location>

                <AppBar formData={formData} />
                <div className='container containsRouter'>
                    <Router>
                        <MainPage path='/' {...this.props} />
                        <ExportPage path='/export' {...this.props} />
                        <FormPage path='/form/:formID' {...this.props} handleFormSubmit={this.handleFormSubmit} />
                        <NotFoundPage default />
                    </Router>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration={3000}
                    message={'Your form submission has been recorded.'}
                />
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
