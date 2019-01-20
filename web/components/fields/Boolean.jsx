import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    button_selected: {
        background: theme.palette.secondary.main + '!important',
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
        const btnClasses = { root: classes.button, selected: classes.button_selected };
        return <div style={{ paddingTop: '0.5em' }}>
            <p>
                {config.label}
            </p>
            <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={value} exclusive onChange={this.handleChange}>
                    <ToggleButton classes={btnClasses} value="true">
                        Yes
                    </ToggleButton>
                    <ToggleButton classes={btnClasses} value="false">
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>;
    }
}
 
export const id = 'boolean';
export default hot(withStyles(styles)(Boolean));
