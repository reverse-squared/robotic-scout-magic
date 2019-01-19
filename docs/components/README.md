# Components
The components are the building blocks of every form. All the components are placed in a JSON file to make a form.

## All Components
Components have a spcific data type with properties to customize it.

|  Data Type |                                         Description                                         |
|:----------:|:-------------------------------------------------------------------------------------------:|
|    text    | A text box for short text inputs.                                                           |
|   number   | A simple text box that only accepts a number input.                                         |
|   counter  | A number with two buttons next to it with the jobs of increasing and decreasing the number. |
|   boolean  | Two checkboxes with true and false labels. Only one is selectable.                          |
|    radio   | A list of radio buttons with customizable text.                                             |
|  checkbox  | A list of checkboxes with customizable text.                                                |
| text-area  | A large text box made for notes and text longer than a normal text box.                     |

> [!DANGER]
> The boolean, radio, and checkbox data types are currently not supported, and will not show on forms, and will instead show an error message in it's place.

> [!WARNING]
> The counter data type will not go below zero without editing the source code in `web/components/fields/Counter.jsx`!

With text, numbers, counters, and booleans, and text fields, you can simply change the `type` and the `label`. With the checkbox and radio data type, you need another field that contains an array called `options`. See example below.

An example form with radio and checkbox options.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "radio",
            "label": "Pick a number, any number.",
            "options": ["0", "1", "2", "3"]
        },
        {
            "type": "checkbox",
            "label": "What's your favorite number?.",
            "options": ["-3123", "69", "42", "NaN"]
        }
    ]
}
```

**Component Pages**
- [Text](components/text.md)
- [Number](components/number.md)
- [Counter](components/counter.md)
- [Boolean]()
- [Radio]()
- [Checkbox]()
- [Text Area](components/text-area.md)
