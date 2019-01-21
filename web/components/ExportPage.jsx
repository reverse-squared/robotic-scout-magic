import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import FontAwesome from './FontAwesome';

class ExportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            usbDevice: null,
            form: null,
            usbDeviceRemoved: null,
            
            formChooseEmptyOpen: false,
        };
        this.handleSelectUSB = (item) => () => {
            this.setState({
                activeStep: this.state.activeStep + 1,
                usbDevice: item,
                usbDeviceRemoved: false
            });
        };
        this.handleSelectForm = (item) => () => {
            if ((this.props.submitCounts[item.id] || 0) === 0) {
                this.setState({
                    form: item,
                    formChooseEmptyOpen: true,
                });
            } else {
                this.setState({
                    activeStep: this.state.activeStep + 1,
                    form: item
                });
            }
        };
        this.handleFormChooseEmptyDialogClose = () => {
            this.setState({
                form: null,
                formChooseEmptyOpen: false,
            });
        };
        this.handleFormChooseEmptyDialogAccept = () => {
            this.setState({
                activeStep: this.state.activeStep + 1,
                formChooseEmptyOpen: false,
            });
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.usbDevice) {
            if (this.props.usbData.find(dev => {
                return this.state.usbDevice.name === dev.name
                    && this.state.usbDevice.type === dev.type
                    && this.state.usbDevice.path === dev.path;
            }) === undefined) {
                this.setState({
                    usbDevice: null,
                    form: null,
                    activeStep: 0,
                    
                    usbDeviceRemoved: true,
                });
            }
        }
    }

    render() {
        const { activeStep } = this.state;

        return (
            <div>
                <h1>Export Data to a USB Drive</h1>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step key={1}>
                        <StepLabel>Choose a Device to Export To{
                            this.state.activeStep > 0 && <span>. <strong>Selected {this.state.usbDevice.path}</strong></span>
                        }</StepLabel>
                        <StepContent>
                            <Typography>
                                {this.state.usbDeviceRemoved?<span><strong>Uh Oh, your selected device was disconnected. </strong></span>:''}Choose a USB Drive to export to from this list. This list will refresh automatically within 10 seconds.
                            </Typography>
                            <List component="nav">
                                {
                                    this.props.usbData.map(item => {
                                        let icon = 'question';
                                        if (item.type === 'sdcard') icon = 'sd-card';
                                        if (item.type === 'usb') icon = 'usb';
                                        if (item.type === 'hdd') icon = 'hdd';

                                        return <ListItem key={item.path} button onClick={this.handleSelectUSB(item)}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FontAwesome icon={icon} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={'Found on path ' + item.path}
                                            />
                                        </ListItem>;
                                    })
                                }
                                {
                                    this.props.usbData.length === 0 && <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FontAwesome icon={'exclamation'} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={'No Storage Devices Detected'}
                                            secondary={'Make sure it\'s plugged in, and try waiting up to 10 seconds.'}
                                        />
                                    </ListItem>
                                }
                            </List>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Choose a Form to Export the Data From</StepLabel>
                        <StepContent>
                            <Typography>
                                Select a form in this list to export to the device on <strong>{this.state.usbDevice && this.state.usbDevice.path}</strong>.
                            </Typography>
                            <List component="nav">
                                {
                                    this.props.formData.map(item => {
                                        // Hidden forms only show hidden in production mode
                                        if (item.hidden && $production) return;

                                        let count = this.props.submitCounts[item.id] || 0;
                                        let secondaryText = <span>
                                            {item.hidden && <strong>Hidden in Production Mode.{' '}</strong>}
                                            {count} Submission{count !== 1 && 's'}
                                        </span>;

                                        return <ListItem key={item.id} button onClick={this.handleSelectForm(item)}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FontAwesome icon={item.icon || 'file-alt'} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={secondaryText}
                                            />
                                        </ListItem>;
                                    })
                                }
                                {
                                    this.props.formData.length === 0 && <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FontAwesome icon={'exclamation'} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={'No Forms found in the /forms folder!'}
                                        />
                                    </ListItem>
                                }
                            </List>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Select an Export Format and File Name</StepLabel>
                        <StepContent>
                            <Typography>
                                etc
                            </Typography>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Finish Export</StepLabel>
                        <StepContent>
                            <Typography>
                                etc
                            </Typography>
                        </StepContent>
                    </Step>
                </Stepper>
                <Dialog
                    open={this.state.formChooseEmptyOpen}
                    onClose={this.handleFormChooseEmptyDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Export form without any submissions?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This may result in an invalid or empty file. Are you sure you want to export a form without any submissions?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleFormChooseEmptyDialogClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.handleFormChooseEmptyDialogAccept} color="primary">
                            Select This Form
                        </Button>
                    </DialogActions>
                </Dialog>;
            </div>
        );
    }
}
 
export default hot(ExportPage);