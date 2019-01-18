import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader';

import TextField from '@material-ui/core/TextField';

class FormPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Button component={Link} to="/">back to home</Button>
            {/* TODO: Replace with the name of the form. */}
            <h1>{this.props.form}</h1>
            {
                this.props.formData.find(x=>x.id===this.props.form).items.map(item => {
                    return <TextField
                        label={item.label}
                        // value={this.state.name}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />;
                })
            }
        </div>;
    }
}

export default hot(module)(FormPage);