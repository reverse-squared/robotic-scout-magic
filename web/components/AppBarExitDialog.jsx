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
        <DialogTitle id="alert-dialog-title">{location.href.includes('/form/') ? 'Exit form without submitting?' : 'Exit without exporting?'}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {
                    location.href.includes('/form/')
                        ? 'Your submission will not be saved if you exit.'
                        : 'You will lose all information entered here.'
                }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseCancel} color="primary" autoFocus>
                Cancel
            </Button>
            <Button onClick={props.handleCloseNavigate} color="primary">
                Exit without {location.href.includes('/form/') ? 'Saving' : 'Exporting'}
            </Button>
        </DialogActions>
    </Dialog>;
};