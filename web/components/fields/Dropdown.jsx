import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        };
    }

    render() {
        const config = this.props.config;
        const value = this.props.value || config.options[config.default] || 'null';

        return <div style={{ paddingTop: '25px' }}>
            <p>
                {config.label}
            </p>

            <FormControl>
                <InputLabel>Select One</InputLabel>
                <Select
                    value={value}
                    onChange={this.handleChange}
                    style={{minWidth: '100px'}}
                >
                    {
                        this.props.config.options.map((option, i) => {
                            return <MenuItem key={i} value={option}>{option}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>
        </div>;
    }
}
 
export const id = 'dropdown';
export default hot(Dropdown);
