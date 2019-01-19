# Radio
A list of items, selectable by radio inputs, where only one is selectable.

> [!DANGER]
> This component is not fully developed and will show an error message on the form instead of the actual component.

## Properties

| Property |  Type  |                           Description                          |
|:--------:|:------:|:--------------------------------------------------------------:|
|   label  | String |            The text to display above the selection.            |
|  options |  Array |    An array of strings representing each possible selection.   |
| default? | Number | The index of the default selected radio input. (Default: None) |

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
            "type": "radio",
            "label": "What did the robot do?",
            "options": [
                "It climbed.",
                "It was on the mat.",
                "It wasn't on the mat."
            ]
        }
    ]
}
```

## Images
Coming soon!
