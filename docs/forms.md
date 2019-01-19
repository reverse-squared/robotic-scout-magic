# Forms
## Creating Forms
Creating your own forms for your needs is one of the main purposes of this applicaion, since everyone's needs are different. Follow the steps below to get started.

**Step 1:** Locate the `forms/` directory, and create a JSON file for your form. For this example, I will use `exmaple.json`.

**Step 2:** All forms need an `id`, `name`, `description`, and an `options` array defined in them.
```json
// forms/example.json

{
    "$schema": "../form-schema.json",
    "id": "example",
    "name": "Example Form",
    "description": "Starter Example Form",
    "options": [
        
    ]
}
```

> [!TIP]
> If you are editing this with [Visual Studio Code](https://code.visualstudio.com/), then `$schema` is optional. It just gives more type information. It is very useful, **But if you are not using Visual Studio Code**, you don't need `$schema`.

Once this is created, continue to **Editing Forms**.

## Editing Forms
Inside of the options array, you will have to place components containing a `type` of data to be entered, along with a `label` to be shown above the input. To view all the components, view the [Components](components/) page.

### Examples
An example form with two text boxes.
```json
// forms/example.json

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

## Exporting Form Data
Coming soon!

## Importing Data to External Programs
### With Excel
Coming soon!
