// Returns the API Router for http requests.
const express = require('express');
const path = require('path');

const form = require('./form');
const usb = require('./destination');
const exporthandler = require('./export');

const api = express.Router();

api.use(require('body-parser').json());

api.get('/all-forms', (req, res) => {
    res.send(form.getFormList());
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

api.get('/export-handlers', (req, res) => {
    res.send(exporthandler.GetExportTypeList());
});

api.get('/default-file-name/:formID/:handlerType', (req, res) => {
    const name = exporthandler.getDefaultFilename(
        form.getFormList().find(x => x.id === req.params.formID),
        req.params.handlerType
    );
    res.send({ string: name });
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
