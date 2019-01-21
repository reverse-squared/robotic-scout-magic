import React, { Component } from 'react';
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
        };
    
        this.handleNext = () => {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        };
    
        this.handleBack = () => {
            this.setState(state => ({
                activeStep: state.activeStep - 1,
            }));
        };
    
        this.handleReset = () => {
            this.setState({
                activeStep: 0,
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
                        <StepLabel>Choose a Device to Export To</StepLabel>
                        <StepContent>
                            <Typography>
                                Choose a USB Drive to export to from this list. This list will refresh automatically within 10 seconds.
                                <List component="nav">
                                    {
                                        this.props.usbData.map(item => {
                                            let icon = 'question';
                                            if (item.type === 'sdcard') icon = 'sd-card';
                                            if (item.type === 'usb') icon = 'usb';
                                            if (item.type === 'uas') icon = 'hdd';

                                            return <ListItem key={item.id} button>
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
                            </Typography>
                        </StepContent>
                    </Step>
                    <Step key={2}>
                        <StepLabel>Choose a Form to Export the Data From</StepLabel>
                        <StepContent>
                            <Typography>
                                etc
                            </Typography>
                        </StepContent>
                    </Step>
                    <Step key={3}>
                        <StepLabel>Select an Export Format and File Name</StepLabel>
                        <StepContent>
                            <Typography>
                                etc
                            </Typography>
                        </StepContent>
                    </Step>
                    <Step key={3}>
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
 
export default ExportPage;