import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import TextField from '@material-ui/core/TextField';

class Text extends Component {
    constructor(props) {
        // props.config
        // props.value
        // props.onChange
        super(props);
        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        };
    }
    render() {
        const config = this.props.config;
        const value = this.props.value || config.default || '';
        return <div style={{ paddingTop: '0.5em' }}>
            <TextField
                label={config.label}
                value={value}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                helperText={config.helperText}
            />
        </div>;
    }
}
 
export const id = 'text';
export default hot(Text);
