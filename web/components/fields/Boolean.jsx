import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// var trueColor = '#4caf50';
// var falseColor = '#f44336';

const styles = theme => ({
    toggleContainer: {
        paddingLeft: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        // padding: '0.5em',
        height: '3em',
        fontSize: '1em',
        padding: '0 1.5em',
        color: 'black',
        transition: 'all 100ms linear',
        background: '#FAFAFA'
    },
    button_selected_true: {
        background: '#4caf50' + '!important',
        color: 'white!important',
    },
    button_selected_false: {
        background: '#f44336' + '!important',
        color: 'white!important',
    }
});

class Boolean extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event, value) => {
            this.props.onChange(value);
        };
    }   

    render() {
        const { classes, config } = this.props;
        const value = this.props.value || String(config.default) || 'null';
        const btnClassesTrue = { root: classes.button, selected: classes.button_selected_true };
        const btnClassesFalse = { root: classes.button, selected: classes.button_selected_false };
        return <div style={{ paddingTop: '0.5em' }}>
            <p>
                {config.label}
            </p>
            <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={value} exclusive onChange={this.handleChange}>
                    <ToggleButton classes={btnClassesTrue} value="true">
                        {config.trueValue || 'Yes'}
                    </ToggleButton>
                    <ToggleButton classes={btnClassesFalse} value="false">
                        {config.falseValue || 'No'}
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>;
    }
}
 
export const id = 'boolean';
export function resolveSubmissionValue(config, value) {
    if (!('default' in config) && value === undefined) return undefined;
    if(value !== undefined)
        return value === 'true' ? (config.trueValue || 'Yes') : (config.falseValue || 'No');
    return config.default ? (config.trueValue || 'Yes') : (config.falseValue || 'No');
}
export default hot(withStyles(styles)(Boolean));
