const express = require('express');

const api = express.Router();
const path = require('path');
const fs = require('fs');

api.get('/all-forms.json', (req, res) => {
    fs.readdir('./forms', (err, files) => {
        if(err) {
            return res.send({ error: true });
        }
        Promise.all(
            files.map(file => {
                return new Promise((resolve, reject) => {
                    fs.readFile(path.join(__dirname, '../forms/', file), (err, data) => {
                        if(err) reject(err);
                        resolve(JSON.parse(data.toString()));
                    });
                });
            })
        ).then(jsons => {
            res.send(jsons);
        }).catch(() => {
            res.send({error: true});
        });
    });
});

api.use(express.static(path.join(__dirname, '../public/')));

module.exports = api;