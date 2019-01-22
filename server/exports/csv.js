// CSV Export, where each row is a seperate submission
function CSVString(string) {
    return '"' + String(string).replace(/"/g,'""') + '"';
}

function ExportCSV(formData, submissions) {
    const labels = formData.items.map(item => item.label);
    let csv = labels.map(CSVString).join(',');
    if(submissions.length >= 1)
        csv += '\n' + submissions.map(submission => submission.map(CSVString).join(',')).join('\n');
    return csv;
}

// Export Metadata
module.exports = {
    name: 'CSV',
    description: 'Comma Seperated Values file which can be imported to Excel or another spreadsheet program.',
    icon: 'file-csv',
    
    handler: ExportCSV,
    extension: 'csv',

    CSVString
};