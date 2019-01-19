const fs = require('fs');
const path = require('path');

describe('NPM Packages', function() {
    const packageJSON = require('../package.json');
    
    it('Dependencies should be installed', function () {
        return Promise.all(
            Object.keys(packageJSON.dependencies || {}).map(dep => {
                return new Promise((resolve, reject) => {
                    fs.exists(path.join(__dirname, '../node_modules/' + dep), (exists) => {
                        if (exists) {
                            resolve();
                        } else {
                            reject('Could not find ' + dep);
                        }
                    });
                });
            })
        );
    });
    it('Dev Dependencies should be installed', function () {
        return Promise.all(
            Object.keys(packageJSON.devDependencies || {}).map(dep => {
                return new Promise((resolve, reject) => {
                    fs.exists(path.join(__dirname, '../node_modules/' + dep), (exists) => {
                        if (exists) {
                            resolve();
                        } else {
                            reject('Could not find ' + dep);
                        }
                    });
                });
            })
        );
    });
});
