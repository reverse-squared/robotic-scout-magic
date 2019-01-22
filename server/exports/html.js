// HTML Export
const TableHeaders = (items) => {
    return `<tr>
        ${ items.map(item => `<th ${typeof item !== 'number' ? 'class="D"' : ''}>${item}</th>`).join('') }
    </tr>`;
};
const TableRow = (items) => {
    return `<tr>
        ${ items.map(item => `<td ${typeof item !== 'number' ? 'class="D"' : ''}>${item}</td>`).join('') }
    </tr>`;
};

const Template = (form, submissions) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>html{color:rgba(0,0,0,.87)}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}@media print{*,*:after,*:before,*:first-letter{background:transparent!important;color:#000!important;box-shadow:none!important}thead{display:table-header-group}img,tr{page-break-inside:avoid}}html{width:100%;height:100%;-ms-touch-action:manipulation;touch-action:manipulation}body{width:100%;min-height:100%;margin:0}body,html{font-family:"Helvetica","Arial",sans-serif;font-size:14px;font-weight:400;line-height:20px}h1{font-size:56px;line-height:1.35;letter-spacing:-.02em;margin:24px 0}h1,h2{font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400}.A{position:relative;border:1px solid rgba(0,0,0,.12);border-collapse:collapse;white-space:nowrap;font-size:13px;background-color:#fff}.A thead{padding-bottom:3px}.A tbody tr{position:relative;height:48px;transition-duration:0.28s;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:background-color}.A tbody tr:hover{background-color:#eee}.A td{text-align:right}.A th{padding:0 18px 12px;text-align:right}.A td:first-of-type,.A th:first-of-type{padding-left:24px}.A td:last-of-type,.A th:last-of-type{padding-right:24px}.A td{position:relative;height:48px;border-top:1px solid rgba(0,0,0,.12);border-bottom:1px solid rgba(0,0,0,.12);padding:12px 18px;box-sizing:border-box}.A td,.A td .A__select{vertical-align:middle}.A th{position:relative;vertical-align:bottom;text-overflow:ellipsis;font-weight:700;line-height:24px;letter-spacing:0;height:48px;font-size:12px;color:rgba(0,0,0,.54);padding-bottom:8px;box-sizing:border-box}.D.D{text-align:left}.B{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}*{font-family: Arial, Helvetica, sans-serif;}h1{text-align: center;margin:0!important;padding:20px 0!important;font-size:3em!important}table{margin:auto;}</style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${form.name} - RSM</title>
</head>
<body>
    <h1>${form.name}</h1>

    <table class="A C B">
        <thead>
            ${TableHeaders(form.items.map(item => item.label))}
        </thead>
        <tbody>
            ${submissions.map(row => TableRow(row)).join('')}
        </tbody>
    </table>
</body>
</html>
`;

// Export Metadata
module.exports = {
    name: 'HTML',
    description: 'Exports an HTML Webpage with a table.',
    icon: 'file-code',
    
    handler: Template,
    extension: 'html',
};