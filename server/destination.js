// Handles export destinations, when they update, and all that.
const drivelist = require('drivelist');
const chalk = require('chalk');

var usbChangeListeners = [];
var lastList = [];
async function BeginUSBListening() {
    lastList = await getUSBList();
    setInterval(() => {
        getUSBList().then(list => {
            if(list.length !== lastList.length) {
                lastList = list;
                usbChangeListeners.forEach(x => x(list));
            }
            lastList = list;
        });
    }, 6000);
}
function onUSBChange(listener) {
    usbChangeListeners.push(listener);
}
function getUSBList() {
    return new Promise((resolve, reject) => {
        drivelist.list((error, drives) => {
            if (error) {
                reject(error);
            }
            resolve(drives);
        });
    });
}
function getCachedUSBList() {
    return lastList;
}
function getExportDestinations() {
    return getCachedUSBList()
        .filter(item => !item.isSystem && item.isRemovable)
        .map(item => {
            let type = 'Unknown';
            if (item.isCard) type = 'sdcard';
            if (item.isUSB) type = 'usb';
            if (item.isUAS) type = 'uas';
            return item.mountpoints.map(({ path }) => ({
                name: item.description,
                type: type,
                readOnly: item.isReadOnly,
                path
            }));
        })
        .reduce((x, y) => x.concat(y), []);
}

module.exports = {
    BeginUSBListening,
    onUSBChange,
    getUSBList: getCachedUSBList,
    getExportDestinations,
};
