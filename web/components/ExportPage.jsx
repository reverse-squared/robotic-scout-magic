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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FontAwesome from './FontAwesome';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from '@reach/router';

const redButtonTheme = createMuiTheme({
    palette: {
        primary: { main: '#ef5350' }, // red
    },
    typography: {
        useNextVariants: true,
    },
});

const RedButton = (props) => <MuiThemeProvider theme={redButtonTheme}><Button color="primary" {...props} /></MuiThemeProvider>;

class ExportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            usbDevice: null,
            form: null,
            usbDeviceRemoved: null,
            
            formChooseEmptyOpen: false,
            exportFormats: [],

            selectedFormat: null,
            exportFilename: '',
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
        this.handleSelectType = (item) => () => {
            this.setState({ selectedFormat: item.type });
        };
        this.handleFilenameChange = (ev) => {
            this.setState({ exportFilename: ev.target.value });
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
        this.handleFinishStep3 = () => {
            this.setState({
                activeStep: this.state.activeStep + 1,
            });
            fetch('/run-export', {
                method: 'POST',
                body: JSON.stringify({
                    form: this.state.form,
                    type: this.state.selectedFormat,
                    output: this.state.usbDevice.path + 'RSM_Data/' + this.state.exportFilename + '.' + this.state.exportFormats.find(x => x.type === this.state.selectedFormat).extension
                }),
                headers: {'Content-Type': 'application/json'}
            }).then(() => {
                // lmao ignore response if it failed
                this.setState({
                    activeStep: this.state.activeStep + 1,
                });
            });
        };
        this.handleReset = () => {
            this.setState({
                activeStep: 0,
                usbDevice: null,
                form: null,
                usbDeviceRemoved: null,
                
                formChooseEmptyOpen: false,
                exportFormats: [],

                selectedFormat: null,
                exportFilename: '',
            });
        };
    }
    componentDidMount() {
        window.ExitWithoutSave = () => this.state.activeStep > 0;
        fetch('/export-handlers').then(r => r.json()).then(exportFormats => {
            this.setState({ exportFormats });
        });
    }
    componentWillUnmount() {
        window.ExitWithoutSave = null;        
    }
    componentDidUpdate() {
        if(this.state.usbDevice && this.state.activeStep < 4) {
            if (this.props.usbData.find(dev => {
                return this.state.usbDevice.name === dev.name
                    && this.state.usbDevice.type === dev.type
                    && this.state.usbDevice.path === dev.path;
            }) === undefined) {
                this.setState({
                    usbDevice: null,
                    form: null,
                    activeStep: 0,
                    formChooseEmptyOpen: false,                    
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
                    <Step>
                        <StepLabel>Choose a Device to Export To{
                            this.state.activeStep > 0 && <span>. <strong>Selected {this.state.usbDevice.path}</strong></span>
                        }</StepLabel>
                        <StepContent>
                            <Typography>
                                {this.state.usbDeviceRemoved?<span><strong>Uh Oh, your selected device was disconnected. </strong></span>:''}Choose a USB Drive to export to from this list. This list will refresh automatically within 10 seconds.
                            </Typography>
                            <List>
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
                            <List>
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
                                Choose a format to use in the export.
                            </Typography>
                            <List>
                                {
                                    this.state.exportFormats.map(item => {
                                        return <ListItem
                                            key={item.type}
                                            button
                                            selected={this.state.selectedFormat === item.type}
                                            onClick={this.handleSelectType(item)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FontAwesome icon={item.icon || 'file-alt'} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.description}
                                            />
                                        </ListItem>;
                                    })
                                }
                            </List>
                            <br/>
                            <TextField
                                variant="outlined"
                                label="Filename to export to."
                                onChange={this.handleFilenameChange}
                                value={this.state.exportFilename}
                                disabled={!this.state.selectedFormat}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        {this.state.activeStep > 0 &&
                                            <span style={{opacity:'0.7'}}>
                                                {this.state.usbDevice.path}RSM_Data\
                                            </span>
                                        }
                                    </InputAdornment>,
                                    endAdornment: this.state.selectedFormat && <InputAdornment position="end">
                                        <span style={{opacity:'0.7'}}>
                                            .{this.state.exportFormats.find(x => x.type === this.state.selectedFormat).extension}
                                        </span>
                                    </InputAdornment>,
                                }}
                            />
                            <br/>
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!this.state.exportFilename}
                                onClick={this.handleFinishStep3}
                            >Continue</Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Exporting</StepLabel>
                        <StepContent>
                            <Typography>
                                Exporting your form, this should take a few seconds.
                            </Typography>
                            <br/>
                            <LinearProgress />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Extra Actions</StepLabel>
                        <StepContent>
                            <Typography>
                                Your form has been exported to the selected device at
                                {' '}
                                <strong>
                                    {this.state.usbDevice && this.state.usbDevice.path}
                                    RSM_Data\
                                    {this.state.exportFilename}
                                    .
                                    {this.state.selectedFormat &&
                                        this.state.exportFormats
                                            .find(x => x.type === this.state.selectedFormat)
                                            .extension
                                    }
                                </strong>
                            </Typography>
                            <br/>
                            <RedButton
                                variant="contained"
                            >Delete Data From Server</RedButton>
                            <br/><br/>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleReset}
                            >Export another form</Button>
                            <br/><br/>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/"
                            >Go to the Main Page</Button>
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
                </Dialog>
            </div>
        );
    }
}

export default hot(ExportPage);