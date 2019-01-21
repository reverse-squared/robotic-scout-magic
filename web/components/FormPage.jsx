import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function requireAll(r) { return r.keys().map(r); }
const fieldModules = requireAll(require.context('./fields/', true, /\.jsx?$/));
const FieldTypes = fieldModules.reduce(
    (obj, mod) => {
        obj[mod.id] = mod.default;
        obj[mod.id].resolveSubmissionValue = mod.resolveSubmissionValue;
        return obj;
    },
    {}
);

const IsHeaderSymbol = Symbol('IsHeaderSymbol');

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
        this.getSubmitData = () => {
            return form.items.map((item, i) => {
                if (item.type === 'header') return IsHeaderSymbol;
                const Field = FieldTypes[item.type];

                if (!Field) {
                    return null;
                } else {
                    if (Field.resolveSubmissionValue) {
                        return Field.resolveSubmissionValue(item, this.state.inputs[i]);
                    } else {
                        return this.state.inputs[i];
                    }
                }
            }).filter(x => x !== IsHeaderSymbol);
        };
        this.handleSubmit = () => {
            this.props.handleFormSubmit(this.props.formID, this.getSubmitData());
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
            
            <br/><br/>

            <Button
                variant="contained"
                color="primary"
                disabled={this.getSubmitData().some(x => x === undefined)}
                onClick={this.handleSubmit}
            >Submit</Button>
        </div>;
    }
}

export default hot(FormPage);