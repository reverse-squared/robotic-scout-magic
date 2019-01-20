import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import {
    Typography,
} from '@material-ui/core';

function requireAll(r) { return r.keys().map(r); }
const fieldModules = requireAll(require.context('./fields/', true, /\.jsx?$/));
const FieldTypes = fieldModules.reduce(
    (obj, mod) => {
        obj[mod.id] = mod.default;
        return obj;
    },
    {}
);

class FormPage extends Component {
    constructor(props) {
        super(props);
        const form = this.props.formData.find(x => x.id === this.props.formID);
        if(!form) {
            return;
        }
        this.handleFieldChange = (i, new_value) => {
            const inputs = this.state.inputs.concat();
            inputs[i] = new_value;
            this.setState({
                inputs: inputs,
                exitWithoutSaving: true
            });
        };
        this.state = {
            inputs: form.items.map(() => undefined),
            inputChangeHandlers: form.items.map((item, i) => this.handleFieldChange.bind(this, i)),
            exitWithoutSaving: false,
        };
    }

    componentDidMount() {
        window.ExitWithoutSave = () => this.state.exitWithoutSaving;
    }
    componentWillUnmount() {
        window.ExitWithoutSave = null;
    }

    render() {
        const form = this.props.formData.find(x => x.id === this.props.formID);
        if(!form) {
            return <div>
                <h1>404 Not Found!</h1>
                <p>
                    Cannot find the form with id "<span style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{this.props.formID}</span>", try checking the forms folder.
                </p>
            </div>;
        }
        return <div>
            <Typography variant='h4' color='inherit'>
                {form.name}
            </Typography>
            
            {
                form.items.map((item, i) => {
                    const Field = FieldTypes[item.type];
                    if(!Field) {
                        return <div key={i}>
                            <h4 style={{ color: 'red' }}>Uh Oh - Field Type <span style={{ fontFamily: 'monospace' }}>{item.type}</span> does not exist or is in development.</h4>
                        </div>;
                    } else {
                        return <Field
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

export default hot(FormPage);