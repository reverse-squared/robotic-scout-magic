import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
    return <Dialog
        open={props.dialogOpen}
        onClose={props.handleExitDialogClose}
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
            <Button onClick={props.handleCloseCancel} color="primary" autoFocus>
                Cancel
            </Button>
            <Button onClick={props.handleCloseNavigate} color="primary">
                Exit without Saving
            </Button>
        </DialogActions>
    </Dialog>;
};