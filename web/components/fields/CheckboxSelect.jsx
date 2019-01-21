import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CheckboxSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.checked);
        };
    }

    render() {
        const config = this.props.config;
        const value = this.props.value || config.default || false;

        return <div style={{ paddingTop: '25px' }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={this.handleChange}
                    />
                }
                label={config.label}
            />
        </div>;
    }
}
 
export const id = 'checkbox';
export function resolveSubmissionValue(config, value) {
    return value || config.default || false;
}
export default hot(CheckboxSelect);
