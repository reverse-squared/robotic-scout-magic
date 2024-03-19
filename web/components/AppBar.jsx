import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Location } from '@reach/router';
import Loadable from 'react-loadable';

import MUIAppBar from '@material-ui/core/AppBar';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SVGOffline from '@material-ui/icons/OfflineBolt';
import SVGBack from '@material-ui/icons/ArrowBack';

import Package from '../../package.json';

const DialogLoader = Loadable({
    loader: () => import('./AppBarExitDialog').then(Dialog => {
        return Dialog.default;
    }),
    loading: () => null,
});

class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorMenuEl: null
        };
        this.handleBack = () => {
            if (window.ExitWithoutSave && window.ExitWithoutSave()) {
                this.setState({ dialogOpen: true });
            } else {
                this.navigate('/');
            }
        };
        this.handleExitDialogClose = (ev) => {
            this.setState({ dialogOpen: false });
        };
        this.handleCloseCancel = (ev) => {
            this.setState({ dialogOpen: false });
        };
        this.handleCloseNavigate = (ev) => {
            this.setState({ dialogOpen: false });
            this.navigate('/');
        };
        this.state = {
            dialogOpen: false
        };
    }

    componentDidMount() {
        window.onbeforeunload = () => {
            if (this.state.dialogOpen) return undefined;
            if (window.ExitWithoutSave && window.ExitWithoutSave()) return true;
            return undefined;
        };
    }
    componentWillUnmount(prevProps, prevState) {
        window.onbeforeunload = null;
    }

    render() { 
        return <Location>
            {({location, navigate}) => {
                this.navigate = navigate;

                const showBackBtn = location.pathname !== '/';
                return <div>
                    <MUIAppBar position='fixed' color='primary' style={{zIndex:'2'}}>
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
                            <Icon
                                color="inherit"
                                id="offlineButton"
                                style={{paddingRight: '6px', display: 'none'}}
                            >
                                <SVGOffline />
                            </Icon>
                            <Typography variant='h6' color='inherit'>
                                {Package.displayName}{$production ? '' : ' - Development Build'}
                            </Typography>
                        </Toolbar>
                    </MUIAppBar>
                    <DialogLoader
                        dialogOpen={this.state.dialogOpen}
                        handleExitDialogClose={this.handleExitDialogClose}
                        handleCloseCancel={this.handleCloseCancel}
                        handleCloseNavigate={this.handleCloseNavigate}
                    />
                </div>;
            }}
        </Location>;
        
    }
}
 
export default hot(AppBar);