# Time
A simple field for selecting the time.

## Properties

| Property |  Type  |               Description               |
|:--------:|:------:|:---------------------------------------:|
|   label  | String | The text display above the time picker. |
| exportLabel? |  String | A short description which will be used when the form is exported or viewed in a table. |

## Usage
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "time",
            "label": "Select the Time"
        }
    ]
}
```

# Images
![time](../img/time.png ":size=200%")
![time-hours](../img/time-hours.png ":size=200%")
![time-minutes](../img/time-minutes.png ":size=200%")
![time-filled](../img/time-filled.png ":size=200%")
