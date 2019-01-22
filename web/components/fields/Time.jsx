import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';

class Time extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (time) => {
            this.props.onChange(time);
        };
    }

    render() {
        const { config } = this.props;
        const value = this.props.value || null;

        return <div style={{ paddingTop: '0.5em' }}>
            <p>
                {config.label}
            </p>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                        <TimePicker
                            label="Select Time"
                            value={value}
                            onChange={this.handleChange}
                            variant='outlined'
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        </div>;
    }
}
 
export const id = 'time';
export function resolveSubmissionValue(config, value) {
    return value || '';
}
export default hot(Time);
