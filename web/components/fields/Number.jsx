import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class Number extends Component {
    constructor(props) {
        // props.config
        // props.value
        // props.onChange
        super(props);
        this.state = {
            showCharacterError: false,
        };
        let timer = null;
        this.handleChange = (ev) => {
            if (/[^0-9]/.test(event.target.value)) {
                // warn
                this.setState({ showCharacterError: true });
                if(timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    this.setState({ showCharacterError: false });
                    timer = null;
                }, 2000);
            } else {
                if (timer) clearTimeout(timer);
                if (this.state.showCharacterError) this.setState({ showCharacterError: false });
                this.props.onChange(event.target.value);
            }
        };
    }
    render() {
        const value = this.props.value || '';
        const config = this.props.config;
        return <div style={{ paddingTop: '0.5em', marginBottom: '-1.5em' }}>
            <TextField
                label={config.label}
                value={value}
                onChange={this.handleChange}
                margin='normal'
                variant='outlined'
                error={this.state.showCharacterError}
                helperText={this.state.showCharacterError ? <span style={{color:'red', fontWeight: 'bold'}}>You can only enter numbers</span> : ' '}
            />
        </div>;
    }
}
 
export default Number;