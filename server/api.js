// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');
const exporthandler = require('./export');

const api = express.Router();

api.use(require('body-parser').json());

api.get('/all-forms.json', (req, res) => {
    form.getFormList().then(jsons => {
        res.send(jsons);
    }).catch(() => {
        res.send({error: true});
    });
});

api.post('/submit/:formID', (req, res) => {
    exporthandler.HandleSubmit(req.params.formID, req.body).then(x => {
        res.send({ success: true });
    }).catch(x => {
        res.send({ success: false });
    });
});

api.use(express.static(path.join(__dirname, '../public/')));

module.exports = api;
