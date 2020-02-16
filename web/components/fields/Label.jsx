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
        console.log(this.props);
        const config = this.props.config;
        const value = this.props.value || config.default || '';
        return <div style={{ paddingTop: '0.5em', marginBottom: "-16px" }}>
            <p>{config.label}</p>
        </div>;
    }
}
 
export const id = 'label';
export function resolveSubmissionValue(config, value) {
    return value || '';
}
export default hot(Text);
