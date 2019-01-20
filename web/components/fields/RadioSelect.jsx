import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class RadioSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        };
    }

    render() {
        const config = this.props.config;
        const value = this.props.value || config.options[config.default] || 'null';

        return <div style={{paddingTop: '10px'}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">{config.label}</FormLabel>
                <RadioGroup
                    value={value}
                    onChange={this.handleChange}
                >
                    {
                        this.props.config.options.map((option, i) => {
                            return <FormControlLabel key={i} value={option} control={<Radio />} label={option} />;
                        })
                    }
                </RadioGroup>
            </FormControl>
        </div>;
    }
}
 
export const id = 'radio';
export default hot(RadioSelect);
