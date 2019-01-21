// Handles export destinations, when they update, and all that.
const drivelist = require('drivelist');
const chalk = require('chalk');

var usbChangeListeners = [];
var lastList = [];
async function BeginUSBListening() {
    lastList = await getUSBList();
    setInterval(() => {
        getUSBList().then(list => {
            if(
                list.length !== lastList.length
            ) {
                usbChangeListeners.forEach(x => x());
            }
            lastList = list;
        });
    }, 3000);
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

}

module.exports = {
    BeginUSBListening,
    onUSBChange,
    getUSBList: getCachedUSBList,
    getExportDestinations,
};

// BeginUSBListening();
// onUSBChange((list) => {
// console.log('USB List Changed!');
// });