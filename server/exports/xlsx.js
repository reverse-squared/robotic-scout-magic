// Excel Export
const XLSX = require('xlsx');
const fs = require('fs');

function ExportExcel(formData, submissions) {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(submissions);
    XLSX.utils.book_append_sheet(workbook, sheet, formData.name);

    XLSX.writeFile(workbook, './export.xlsx');
    const str = fs.readFileSync('./export.xlsx');
    fs.unlinkSync('./export.xlsx');
    return str;
}

// Export Metadata
module.exports = {
    name: 'Microsoft Excel',
    description: 'something cool program etcetc',
    icon: 'file-excel',
    
    handler: ExportExcel,
    extension: 'xlsx',
};