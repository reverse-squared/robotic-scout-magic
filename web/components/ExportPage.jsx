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
            form: null,
            
            formChooseEmptyOpen: false,
            exportFormats: [],

            selectedFormat: null,
            hasDeletedForm: false,
            exported: null,
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
            this.state.selectedFormat = item.type;
            this.handleFinishStep3();
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
                    form: this.state.form.id,
                    type: this.state.selectedFormat,
                }),
                headers: {'Content-Type': 'application/json'}
            }).then((res) => {
                // lmao ignore response if it failed
                res.json().then((res) => { this.state.exported = res.output });
                this.setState({
                    activeStep: this.state.activeStep + 1,
                });
            });
        };
        this.download = () => {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.exported));
            element.setAttribute('download', 'scouting_data.'+this.state.selectedFormat);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
        };
        this.handleReset = () => {
            this.setState({
                activeStep: 0,
                form: null,
                
                formChooseEmptyOpen: false,

                selectedFormat: null,
                hasDeletedForm: false,
                exported: null,
            });
        };
        this.handleDelete = () => {
            this.setState({ hasDeletedForm: true });
            fetch('/delform/'+this.state.form.id, { method: 'DELETE' });
        };
    }
    componentDidMount() {
        fetch('/export-handlers').then(r => r.json()).then(exportFormats => {
            this.setState({ exportFormats });
        });
    }
    componentWillUnmount() {
        window.ExitWithoutSave = null;        
    }

    render() {
        const { activeStep } = this.state;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Choose a Form to Export the Data From</StepLabel>
                        <StepContent>
                            <Typography>
                                <strong>Select a form in this list to export</strong>.
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
                        <StepLabel>Select an Export Format</StepLabel>
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
                        <StepLabel>Done</StepLabel>
                        <StepContent>
                            <Typography>
                                Your form has been exported
                            </Typography>
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.download}
                            >Download</Button>
                            <br/>
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/"
                            >Go to the Main Page</Button>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default hot(ExportPage);