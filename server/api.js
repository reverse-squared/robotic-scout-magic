// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');
const usb = require('./destination');
const exporthandler = require('./export');

const api = express.Router();

api.use(require('body-parser').json());

api.get('/all-forms.json', (req, res) => {
    res.send(form.getFormList());
});

api.get('/usb.json', (req, res) => {
    res.send(usb.getExportDestinations());
});

api.post('/submit/:formID', (req, res) => {
    exporthandler.HandleSubmit(req.params.formID, req.body).then(x => {
        res.send({ success: true });
        
        exporthandler.GetSubmissionCounts().then(counts => {
            sockets.forEach(socket => socket.emit('update:submitCounts', counts));
        });
    }).catch(x => {
        res.send({ success: false });
    });
});
api.get('/submission-count', (req, res) => {
    exporthandler.GetSubmissionCounts().then(counts => res.send(counts));
});

module.exports = api;

// Socket Server
var sockets = [];
module.exports.onSocket = (socket) => {
    sockets.push(socket);
    socket.on('disconnect', () => {
        sockets = sockets.filter(x => x.id !== socket.id);
    });
    
    const data = usb.getExportDestinations();
    socket.emit('update:usbData', data);
    exporthandler.GetSubmissionCounts().then(counts => {
        sockets.forEach(socket => socket.emit('update:submitCounts', counts));
    });

};
usb.onUSBChange(() => {
    const data = usb.getExportDestinations();
    sockets.forEach(socket => socket.emit('update:usbData', data));
});
form.onFormChange((data) => {
    sockets.forEach(socket => socket.emit('update:formData', data));
});
