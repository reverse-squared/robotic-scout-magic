// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');
const usb = require('./destination');
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

api.get('/usb.json', (req, res) => {
    res.send(usb.getExportDestinations());
});

api.post('/submit/:formID', (req, res) => {
    exporthandler.HandleSubmit(req.params.formID, req.body).then(x => {
        res.send({ success: true });
    }).catch(x => {
        res.send({ success: false });
    });
});

module.exports = api;
