// Handles exporting and offloading the export to the right 
// export handler.
const fs = require('fs-extra');
const path = require('path');
const forms = require('./form');

const DATA_DIR = path.join(__dirname, '../.data');
const SUBMISSION_FILE = path.join(__dirname, '../.data/.submissions.json');

fs.ensureDirSync(DATA_DIR);
if (!fs.existsSync(SUBMISSION_FILE)) {
    fs.writeFileSync(SUBMISSION_FILE, '{}');
}

function deepcopy(obj) {return JSON.parse(JSON.stringify(obj));}

const ExportHandlers = fs.readdirSync(path.join(__dirname, 'exports')).map(name => {
    const mod = require('./exports/' + name);
    if (typeof mod.name !== 'string') throw 'Error loading export handler ' + name + ', name not a string';
    if (typeof mod.description !== 'string') throw 'Error loading export handler ' + name + ', description not a string';
    if (typeof mod.handler !== 'function') throw 'Error loading export handler ' + name + ', handler not a function';
    if (typeof mod.extension !== 'string') throw 'Error loading export handler ' + name + ', extension not a string';
    mod.type = name.substr(0, name.length - 3);
    return mod;
});

function HandleSubmit(id, submission) {
    return fs.readJSON(SUBMISSION_FILE).then(data => {
        if(!data[id]) data[id] = [];
        
        data[id].push(submission);

        return fs.writeJSON(SUBMISSION_FILE, data);
    });
}
function HandleDelete(id, submission) {
    return fs.readJSON(SUBMISSION_FILE).then(data => {
        delete data[id];
        return fs.writeJSON(SUBMISSION_FILE, data);
    });
}
async function BeginExport(form, type) {
    const allSubmissions = await GetSubmissionList();
    const submissions = allSubmissions[form] || [];
    const formData = deepcopy(forms.getFormList().find(x => x.id === form));

    formData.items = formData.items.filter(x => x.type !== 'header').map(item => {
        item.label = item.exportLabel || item.label;
        return item;
    });

    // handler may be async so lets await it (await is a no op when used on non promises)
    const outputContent = await GetExportHandler(type).handler(formData, submissions);
    
    return outputContent
}
function GetExportTypeList() {
    return ExportHandlers;
}
function GetExportHandler(type) {
    return ExportHandlers.find(x => x.type === type);
}
function GetSubmissionList() {
    return fs.readJSON(SUBMISSION_FILE);    
}
function GetSubmissionCounts() {
    return GetSubmissionList().then(json => {
        return Object.keys(json).reduce((obj, name) => {
            obj[name] = json[name] ? json[name].length : 0;
            return obj;
        },{});
    });
}

module.exports = {
    HandleSubmit,
    HandleDelete,
    GetSubmissionList,
    GetSubmissionCounts,

    BeginExport,
    GetExportTypeList
};