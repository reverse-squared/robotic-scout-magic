import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function getSteps() {
    return [
        'Select Devices to Export to.',
        'Select Export Format.',
        'Choose the Forms to Export.',
        'Finish Export.',
    ];
}

function getStepContent(step) {
    switch (step) {
    case 0:
        return `For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.`;
    case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
        return `Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.`;
    case 3:
        return "Lmao it's running now, and should be done like now.";
    default:
        return 'Unknown step';
    }
}

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
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <h1>Export Data to a USB Drive</h1>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div style={{marginTop:'20px'}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}
 
export default ExportPage;