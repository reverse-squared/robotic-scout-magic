// Does most of the logic for loading components, the centerred loading circle,
// and the Live Reloading Socket data.
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => <div className='container' style={{
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}}>
    <CircularProgress />
</div>;

const PageLoadable = (dynamic_import) => Loadable({ loader: dynamic_import, loading: Loader });

const AppLoadable = (App) => Loadable({
    loader: () => fetch('./all-forms').then(res => res.json()).then(json => {
        localStorage.allForms = JSON.stringify(json);
        return () => <SocketAppFormReloader App={App} formData={json} />;
    }).catch(err => {
        if (localStorage.allForms == undefined || localStorage.allForms == '') {
            document.body.innerHTML += 'Please load website when connected to internet atleast once before using offline';
            return;
        }
        console.log('Offline, but got all-forms from cache');
        return () => <SocketAppFormReloader App={App} formData={JSON.parse(localStorage.allForms)} />;
    }),
    loading: Loader,
});

class SocketAppFormReloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            io: null,
            formData: props.formData,
            usbData: null,
            submitCounts: null
        };
    }
    componentDidMount() {
        import('socket.io-client/dist/socket.io.slim.js').then(({default: io}) => {
            this.setState({io: io()});
            this.state.io.on('update:formData', (formData) => this.setState({ formData }));
            this.state.io.on('update:usbData', (usbData) => this.setState({ usbData }));
            this.state.io.on('update:submitCounts', (submitCounts) => this.setState({ submitCounts }));
        });
    }
    componentWillUnmount() {
        if(this.state.io) {
            this.state.io.disconnect();
        }
    }

    render() { 
        const { formData, usbData, submitCounts } = this.state;
        return React.createElement(this.props.App, {
            usbData: usbData || [],
            formData: formData || [],
            submitCounts: submitCounts || {}
        });
    }
}
 
export default SocketAppFormReloader;

export {
    Loader,
    PageLoadable,
    AppLoadable,
};