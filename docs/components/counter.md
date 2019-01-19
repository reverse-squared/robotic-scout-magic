# Counter
A number with two buttons to increase it's value, and decrease. Great for counting and simple number input.

## Properties

| Property |  Type  |             Description             |
|:--------:|:------:|:-----------------------------------:|
|   label  | String | The text display above the counter. |

## Usage
An example form with a number input.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "counter",
            "label": "Power Cubes Scored"
        }
    ]
}
```

## Images
![counter](img/counter.png ":size=200%")
