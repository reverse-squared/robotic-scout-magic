# Export Formats
An export format is a simple function that takes in a [Form JSON]() and a list of all submissions (Array of arrays of strings), and returns the contents of the file. The limitations of this is you can only export a single file, and you cannot see what the file is named, and are only given a default file name option.

Here is a simpler version of the CSV Export, but without any of the actual logic.
```js
// CSV Export, where each row is a seperate submission
function ExportCSV(formData, submissions) {
    return // A CSV Document
}

// Export Metadata
module.exports = {
    name: 'CSV',
    description: 'Comma Seperated Values file which can be imported to Excel or another spreadsheet program.',
    icon: 'file-csv',

    handler: ExportCSV,
    defaultFileName: (form) => `${form.id}.csv`,
};
```

You need to export five variables
- **name**: The display name of the export type.
- **description**: A short description of what the format is.
- **icon**: A [Font Awesome Free](https://fontawesome.com/) (Solid Only) icon to be displayed next to it.
- **handler**: The exporting function, taking in `formData` and `submissions`, returning a string which can be written to a file. It can also return a promise resolving to a string.
- **defaultFileName**: A function taking in a form which will give the default file name of the exported form on the file name prompt.

# Limitations
- You can only export one file
- You don't have full control over the file name
