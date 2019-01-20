import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, redirectTo } from '@reach/router';

import {
    AppBar as MUIAppBar,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    DialogTitle,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';

import SVGBack from '@material-ui/icons/ArrowBack';

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
                    <MUIAppBar position='fixed' color='primary'>
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
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleExitDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Exit form without submitting?</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Your submission will not be saved if you exit.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseCancel} color="primary" autoFocus>
                                Cancel
                            </Button>
                            <Button onClick={this.handleCloseNavigate} color="primary">
                                Exit without Saving
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>;
            }}
        </Location>;
        
    }
}
 
export default hot(AppBar);