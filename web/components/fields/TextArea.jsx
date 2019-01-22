import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        minHeight: '6em'
    }
});

class TextArea extends Component {
    constructor(props) {
        // props.config
        // props.value
        // props.onChange
        super(props);
        this.handleChange = (ev) => {
            this.props.onChange(event.target.value);
        };
    }
    render() {
        const value = this.props.value || '';
        const config = this.props.config;
        const classes = this.props.classes;

        return <div style={{ paddingTop: '0.5em' }}>
            <TextField
                fullWidth
                InputProps={{
                    classes
                }}
                inputProps={{
                    className: classes.root
                }}
                label={config.label}
                value={value}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                multiline={true}
                helperText={config.helperText}
            />
        </div>;
    }
}

export const id = 'text-area';
export function resolveSubmissionValue(config, value) {
    return value || '';
}
export default hot(withStyles(styles)(TextArea));
