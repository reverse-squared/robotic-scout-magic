# Forms
## Creating Forms
Creating your own forms for your needs is one of the main purposes of this applicaion, since everyone's needs are different. Follow the steps below to get started.

**Step 1:** Locate the `forms/` directory, and create a JSON file for your form. For this example, I will use `exmaple.json`.
**Step 2:** All forms need a `$schema`, `id`, `name`, `description`, and an `options` array defined in them.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "options": [
        // Form Contents
    ]
}
```

Once this is created, continue to **Editing Forms**.

## Editing Forms
Inside of the options array, you will have to place objects containing a `type` of data to be entered, along with a `label` to be shown above the input.

Below are the only supported data types.

| Data Type |                                         Description                                         |
|:---------:|:-------------------------------------------------------------------------------------------:|
|   number  | A simple text box that only accepts a number input.                                         |
|  counter  | A number with two buttons next to it with the jobs of increasing and decreasing the number. |
|  boolean  | Two radio buttons with true and false labels.                                               |
|   radio   | A list of radio buttons with customizable text.                                             |

> [!DANGER]
> The boolean and radio data types are currently not supported, and will not show on forms, and will instead show an error message in it's place.

> [!WARNING]
> The counter data type will not go below zero without editing the source code in `web/components/fields/Counter.jsx`!

An example form with two text boxes.
```json
{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "items": [
        {
            "type": "text",
            "label": "A thing"
        },
        {
            "type": "text",
            "label": "Another thing"
        }
    ]
}
```
With numbers, counters, and booleans, you can simply change the `type` and the `label`. With the radio data type, you need another field that contains an array called `options`. See example below.

An example form with radio options.
```json
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
        }
    ]
}
```

## Exporting Form Data
Coming soon!

## Importing Data
### With Excel
Coming soon!
