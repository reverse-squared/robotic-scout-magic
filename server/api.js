// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');

const api = express.Router();

api.get('/all-forms.json', (req, res) => {
    form.getFormList().then(jsons => {
        res.send(jsons);
    }).catch(() => {
        res.send({error: true});
    });
});

api.use(express.static(path.join(__dirname, '../public/')));

module.exports = api;
