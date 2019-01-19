import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import TextField from '@material-ui/core/TextField';

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
        return <div>
            <TextField
                label={config.label}
                value={value}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                multiline={true}
            />
        </div>;
    }
}
 
export const id = 'text-area';
export default hot(TextArea);
