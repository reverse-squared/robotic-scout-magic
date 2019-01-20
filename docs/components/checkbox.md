# Radio
A list of items, selectable by checkboxes inputs, multiple selected boxes possible.

> [!DANGER]
> This component is not fully developed and will show an error message on the form instead of the actual component.

## Properties

|  Property |   Type  |                        Description                        |
|:---------:|:-------:|:---------------------------------------------------------:|
|   label   |  String |      The text to display above the boolean selection.     |
|  options  |  Array  | An array of strings representing each possible selection. |

## Usage
An example form with a radio component.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "checkbox",
            "label": "What did the robot do? (Select multiple.)",
            "options": [
                "It crossed the line.",
                "It climbed.",
                "It defended."
            ]
        }
    ]
}
```

## Images
Coming soon!
