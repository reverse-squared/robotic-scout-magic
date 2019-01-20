import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

class Date extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (date) => {
            this.props.onChange(date);
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
                        <DatePicker
                            label="Select Date"
                            value={value}
                            onChange={this.handleChange}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        </div>;
    }
}
 
export const id = 'date';
export default hot(Date);
