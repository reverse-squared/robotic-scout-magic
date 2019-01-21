import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Avatar from '@material-ui/core/Avatar';
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
        };
        this.handleSelectUSB = (item) => () => {
            this.setState({
                activeStep: this.state.activeStep + 1,
                usbDevice: item
            });
        };
        this.handleSelectForm = (item) => () => {
            this.setState({
                activeStep: this.state.activeStep + 1,
                form: item
            });
        };
    }

    render() {
        const { activeStep } = this.state;

        return (
            <div>
                <h1>Export Data to a USB Drive</h1>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step key={1}>
                        <StepLabel>Choose a Device to Export To
                            activeStep > 0 && <span>. <strong>Selected {this.state.usbDevice.path}</strong></span>
                        }</StepLabel>
                        <StepContent>
                            <Typography>
                                Choose a USB Drive to export to from this list. This list will refresh automatically within 10 seconds.
                            </Typography>
                            <List component="nav">
                                {
                                    this.props.usbData.map(item => {
                                        let icon = 'question';
                                        if (item.type === 'sdcard') icon = 'sd-card';
                                        if (item.type === 'usb') icon = 'usb';
                                        if (item.type === 'uas') icon = 'hdd';

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

                                        let secondaryText;
                                        if (!item.hidden && !item.description) {
                                            secondaryText = undefined;
                                        } else {
                                            secondaryText = <span>{item.hidden && <strong>Hidden in Production Mode.{' '}</strong>}{item.description || ''}</span>;
                                        }

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
            </div>
        );
    }
}
 
export default hot(ExportPage);