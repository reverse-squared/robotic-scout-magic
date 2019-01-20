# Components
The components are the building blocks of every form. All the components are placed in a JSON file to make a form.

## All Components
Components have a spcific data type with properties to customize it.

| Data Type |                                         Description                                         |
|:---------:|:-------------------------------------------------------------------------------------------:|
|    text   |                              A text box for short text inputs.                              |
|   number  |                     A simple text box that only accepts a number input.                     |
|  counter  | A number with two buttons next to it with the jobs of increasing and decreasing the number. |
|  boolean  |              Two checkboxes with true and false labels. Only one is selectable.             |
|   radio   |                       A list of radio buttons with customizable text.                       |
|  checkbox |                         A list of checkboxes with customizable text.                        |
| text-area |           A large text box made for notes and text longer than a normal text box.           |
|   header  |                   Large-ish text for defining sections of form components.                  |

> [!DANGER]
> The checkbox data type is not currently not supported, and will not show on forms, and will instead show an error message in it's place.

**Component Pages**
- [Boolean](components/boolean.md)
- [Checkbox](components/checkbox.md)
- [Counter](components/counter.md)
- [Header](components/header.md)
- [Number](components/number.md)
- [Radio](components/radio.md)
- [Text Area](components/text-area.md)
- [Text](components/text.md)

> [!NOTE]
> In the component pages, optional properties are represented by the property name, followed by a question mark. All optional properties have a default value and are displayed in the description column.
