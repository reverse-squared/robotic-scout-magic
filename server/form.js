// Handles the list of forms.
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const FORM_DIR = path.join(__dirname, '../forms');

let forms = [];
var formListeners = [];

function getFormList() {
    return forms;
}
function reload() {
    fs.readdir(FORM_DIR).then(list => {
        return Promise.all(
            list.map(file => {
                return fs.readJSON(path.join(FORM_DIR, file)).then(json => {
                    delete json.$schema;
                    return json;
                });
            })
        );
    }).then(x => {
        forms = x;
        formListeners.forEach(x => x(forms));
    });
}
function StartFormWatch() {
    chokidar.watch(FORM_DIR)
        .on('add', reload)
        .on('change', reload)
        .on('unlink', reload)
    ;
}
function onFormChange(listener) {
    formListeners.push(listener);
}

reload();
StartFormWatch();

module.exports = {
    getFormList,
    onFormChange
};
