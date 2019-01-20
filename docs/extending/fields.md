# Fields
A Field (Called a "Component" everywhere else in the documentation, now "Component" will mean a `React.Component`) is one element of a form, which is what you specify in the `items` array of a form. The field's type is set by the `type` property on a form item. Each field type is it's own React component defined in it's own file. These files are automatically loaded from `/web/components/fields/`

This is a simple field acting as a wrapper around Material-UI's `TextField` component. The actual Text Field is a little more complex than this for dealing with default values and hot reloading.
```js
import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class Text extends Component {
    constructor(props) { // props = { config, value, onChange }
        super(props); 
        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        };
    }
    render() {
        const config = this.props.config;
        const value = this.props.value || '';
        return <div>
            <TextField
                label={config.label}
                value={value}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
            />
        </div>;
    }
}
 
export const id = 'text';
export default Text;
```
Notice how the Text component is given a `value` and an `onChange` function through props. This is how the data flow works in RSM Fields. Whenever the value is changed, you send it through `onChange` and then the value is sent back into the `value` prop to be rendered.

Each field also has a `config` prop which is what the form field has, including the `type`. If your form is
```json
{
    ...
    "items": [
        {
            "type": "text",
            "label": "Username",
            "helperText": "Must be under 10 characters",
        }
    ]
}
```
The `props.config` of the Text field would be
```js
{
    type: "text",
    label: "Username",
    helperText: "Must be under 10 characters",
}
```
