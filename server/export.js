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

function HandleSubmit(id, submission) {
    return fs.readJSON(SUBMISSION_FILE).then(data => {
        if(!data[id]) data[id] = [];
        
        data[id].push(submission);

        return fs.writeJSON(SUBMISSION_FILE, data);
    });
}
function BeginExport(form, type, output) {
    
}
function GetSubmissionList() {
    return fs.readJSON(SUBMISSION_FILE);    
}

module.exports = {
    HandleSubmit,
    BeginExport,
    GetSubmissionList,
};