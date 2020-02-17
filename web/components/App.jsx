// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component, Fragment } from 'react';
import { Router, createHistory, LocationProvider, Location } from '@reach/router';
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
const ViewPage = PageLoadable(() => import('./ViewPage'));
const ExportPage = PageLoadable(() => import('./ExportPage'));
const NotFoundPage = PageLoadable(() => import('./NotFoundPage'));

// Main App Component, passed a formData prop.
class App extends Component {
    constructor() {
        super();
        this.state = {
            snackbarOpen: false,
            offline: false
        };
        this.uploadForm = (formId, formData) => {
            fetch('/submit/' + formId, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            }).then(x => {
                console.log('Uploaded form');
                if (x.status === 200) {
                    this.setState({ snackbarOpen: true });
                }
            });
        }
        this.handleFormSubmit = (formId, formData) => {
            this.navigate('/');
            
            if (this.state.offline) {
                let store = JSON.parse(localStorage.offlineQueue);
                store.push({id: formId, data: formData})
                console.log(store);
                localStorage.offlineQueue = JSON.stringify(store); // Push to offline queue
            } else {
                this.uploadForm(formId, formData);
            }
        };
        this.handleSnackbarClose = () => {
            this.setState({ snackbarOpen: false });
        };
        this.checkIfOffline = () => {
            fetch('/areweonline').then(() => {
                if (this.state.offline) { // First loop where it's online again
                    document.getElementById('offlineButton').style.display = 'none';
                    this.processOfflineQueue();
                }
                this.state.offline = false;
            }).catch(err => {
                if (!this.state.offline) { 
                    document.getElementById('offlineButton').style.display = 'block';
                }
                this.state.offline = true;
            });
        };
        this.processOfflineQueue = () => {
            for (let form of JSON.parse(localStorage.offlineQueue)) { // Process queue
                this.uploadForm(form.id, form.data);
            }
            localStorage.offlineQueue = '[]'; // Reset queue
        }
        setInterval(this.checkIfOffline, 2000);
        this.checkIfOffline();
        if (localStorage.offlineQueue == undefined || localStorage.offlineQueue == '') localStorage.offlineQueue = '[]';
        this.processOfflineQueue();
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
                        <ViewPage path='/view/:formID' {...this.props} />
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
export default () => <Theme>
    {React.createElement(AppLoadable(App))}
</Theme>;
