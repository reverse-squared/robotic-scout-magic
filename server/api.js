// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');
const exporthandler = require('./export');

const api = express.Router();

api.use(require('body-parser').json());

api.get('/all-forms', (req, res) => {
    res.send(form.getFormList());
});
api.get('/submission-data/:formID', async (req, res) => {
    res.send((await exporthandler.GetSubmissionList())[req.params.formID] || []);
});

api.post('/submit/:formID', (req, res) => {
    try {
        exporthandler.HandleSubmit(req.params.formID, req.body);
        res.send({ success: true });

        exporthandler.GetSubmissionCounts().then(counts => {
            sockets.forEach(socket => socket.emit('update:submitCounts', counts));
        });
    } catch (e) {
        res.send({ success: false });
        console.error(e);
    }
});
api.delete('/delform/:formID', (req, res) => {
    try {
        exporthandler.HandleDelete(req.params.formID);
        res.send({ success: true });

        exporthandler.GetSubmissionCounts().then(counts => {
            sockets.forEach(socket => socket.emit('update:submitCounts', counts));
        });
    } catch (e) {
        res.send({ success: false });
        console.error(e);
    }
});

api.get('/export-handlers', (req, res) => {
    res.send(exporthandler.GetExportTypeList());
});

api.post('/run-export', (req, res) => {

    const form = req.body.form;
    const type = req.body.type;
    if (!(form && type)) {
        return res.send({ success: false });
    }

    exporthandler.BeginExport(form, type).then((output) => {
        //     >:)    magic!
        setTimeout(() => {
            res.send({ success: true, output: output });
        }, 1150 + Math.random() * 844);
    });

});

module.exports = api;

// Socket Server
var sockets = [];
module.exports.onSocket = (socket) => {
    sockets.push(socket);
    socket.on('disconnect', () => {
        sockets = sockets.filter(x => x.id !== socket.id);
    });

    exporthandler.GetSubmissionCounts().then(counts => {
        sockets.forEach(socket => socket.emit('update:submitCounts', counts));
    });

};
form.onFormChange((data) => {
    sockets.forEach(socket => socket.emit('update:formData', data));
});
