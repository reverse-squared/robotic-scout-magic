import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';

// Config can have:
//   label: string
//   default: number
//   min: number
//   max: number
//   step: number

class Counter extends Component {
    constructor(props) {
        // props.config
        // props.value
        // props.onChange
        super(props);
        this.resolveValue = () => this.props.value || this.props.config.default || 0;
        const step = this.props.config.step || 1;

        this.handleDecrease = () => {
            const value = this.resolveValue();
            this.props.onChange(value - step);
        };
        this.handleIncrease = () => {
            const value = this.resolveValue();
            this.props.onChange(value + step);
        };
    }
    render() {
        const value = this.resolveValue();
        const config = this.props.config;
        let min = ('min' in config) ? config.min : 0;
        if(min === null) min = undefined;
        let max = config.max || undefined;

        return <div style={{
            paddingTop: '0.5em'
        }}>
            <p>
                {config.label}
            </p>
            <span style={{margin: '0.5em'}}>
                <Button variant="outlined" size="medium" color="primary" onClick={this.handleDecrease} disabled={value <= min}>
                    <SubtractIcon />
                </Button>
            </span>
            <span style={{ margin: '0.5em', fontWeight: 'bold' }}>{value}</span>
            <span style={{ margin: '0.5em' }}>
                <Button variant="outlined" size="medium" color="primary" onClick={this.handleIncrease} disabled={value >= max}>
                    <AddIcon />
                </Button>
            </span>
        </div>;
    }
}
 
export const id = 'counter';
export default hot(Counter);
