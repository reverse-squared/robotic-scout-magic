import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

class Link extends Component {
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
        return <div style={{ paddingTop: '0.5em' }}>
            <p>{config.label}</p>
            <a href={config.link} target={config.openInNewTab ? "_blank": ""}>{config.linkText || config.link}</a>
        </div>;
    }
}
 
export const id = 'link';
export function resolveSubmissionValue(config, value) {
    return value || '';
}
export default hot(Link);
