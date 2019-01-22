# Boolean
A simple Yes / No input.

## Properties

|   Property   |   Type  |                                       Description                                      |
|:------------:|:-------:|:--------------------------------------------------------------------------------------:|
|     label    |  String |                    The text to display above the boolean selection.                    |
|   default?   | Boolean |                       The default selected value. (Default: None)                      |
|  trueValue?  |  String |                     The label of the true button. (Default: "True")                    |
|  falseValue? |  String |                    The label of the false button. (Default: "False")                   |
|  trueColor?  |   HEX   |                    The color of the true button. (Default: #4caf50)                    |
|  falseColor? |   HEX   |                    The color of the false button. (Default: #f44336)                   |
| exportLabel? |  String | A short description which will be used when the form is exported or viewed in a table. |

> [!WARNING]
> Be sure to add a `#` before the hex value.

## Usage
An example form with a boolean field.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "boolean",
            "label": "Did the robot climb?",
            "default": false,
            "trueValue": "Yes",
            "falseValue": "No"
        }
    ]
}
```

## Images
![boolean](../img/boolean.png ":size=200%")
![boolean-default](../img/boolean-default.png ":size=200%")
![boolean-custom](../img/boolean-custom.png ":size=200%")
