// Handles exporting and offloading the export to the right 
// export handler.
const fs = require('fs-extra');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../.data');
const SUBMISSION_FILE = path.join(__dirname, '../.data/.submissions.json');

fs.ensureDirSync(DATA_DIR);
if (!fs.existsSync(SUBMISSION_FILE)) {
    fs.writeFileSync(SUBMISSION_FILE, '{}');
}

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
function BeginExport(form, type, output) {
    
}
function getDefaultFilename(form, type) {
    if (!GetExportHandler(type)) return 'unknown.txt';
    if (!form) return 'unknown.txt';
    return GetExportHandler(type).defaultFileName(form);
}
function GetExportTypeList() {
    return ExportHandlers;
}
function GetExportHandler(type) {
    console.log(ExportHandlers);
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
    GetSubmissionList,
    GetSubmissionCounts,

    BeginExport,
    getDefaultFilename,
    GetExportTypeList
};