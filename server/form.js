// Handles the list of forms.
const fs = require('fs-extra');
const path = require('path');

const FORM_DIR = path.join(__dirname, '../forms');

function getFormList() {
    return fs.readdir(FORM_DIR).then(list => {
        return Promise.all(
            list.map(file => {
                return fs.readJSON(path.join(FORM_DIR, file)).then(json => {
                    delete json.$schema;
                    return json;
                });
            })
        );
    });
}

module.exports = {
    getFormList,
};
