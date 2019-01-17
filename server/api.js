const express = require('express');

const api = express.Router();
const path = require('path');

api.get('/api', (req, res) => {
    res.send('Hello World from Express.');
});

api.use(express.static(path.join(__dirname, '../public/')));

module.exports = api;