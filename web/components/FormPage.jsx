import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader';
import Typography from '@material-ui/core/Typography';

const FieldTypes = {
    'text': require('./fields/Text').default,
    'number': require('./fields/Number').default,
    'counter': require('./fields/Counter').default,
};

class FormPage extends Component {
    constructor(props) {
        super(props);
        const form = this.props.formData.find(x => x.id === this.props.formID);
        this.handleFieldChange = (i, new_value) => {
            const inputs = this.state.inputs.concat();
            inputs[i] = new_value;
            this.setState({
                inputs: inputs
            });
        };
        this.state = {
            inputs: form.items.map(() => undefined),
            inputChangeHandlers: form.items.map((item, i) => this.handleFieldChange.bind(this, i))
        };
    }

    render() {
        const form = this.props.formData.find(x => x.id === this.props.formID);
        return <div>
            <Typography variant='h4' color='inherit'>
                {form.name}
            </Typography>
            
            {
                form.items.map((item, i) => {
                    const Field = FieldTypes[item.type];
                    if(!Field) {
                        return <div>
                            <h4 style={{ color: 'red' }}>Uh Oh - Field Type <span style={{ fontFamily: 'monospace' }}>{item.type}</span> does not exist or is in development.</h4>
                        </div>;
                    } else {
                        return <Field
                            // eslint-disable-next-line no-console
                            onChange={this.state.inputChangeHandlers[i]}
                            value={this.state.inputs[i]}
                            config={item}
                            key={i}
                        />;

                    }
                })
            }
        </div>;
    }
}

export default hot(module)(FormPage);