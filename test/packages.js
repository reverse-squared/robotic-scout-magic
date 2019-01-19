const fs = require('fs');
const path = require('path');

describe('Node', function() {
    const packageJSON = require('../package.json');
    Object.keys(packageJSON.dependencies || {}).forEach(dep => {
        it(`${dep} should be installed`, function (done) {
            fs.exists(path.join(__dirname, '../node_modules/' + dep), (exists) => {
                if(exists) {
                    done();
                } else {
                    done('Not Found');
                }
            });
        });
    });
    Object.keys(packageJSON.devDependencies || {}).forEach(dep => {
        it(`${dep} should be installed`, function (done) {
            fs.exists(path.join(__dirname, '../node_modules/' + dep), (exists) => {
                if(exists) {
                    done();
                } else {
                    done('Not Found');
                }
            });
        });
    });
    Object.keys(packageJSON.optionalDependencies || {}).forEach(dep => {
        it(`${dep} should be installed`, function (done) {
            fs.exists(path.join(__dirname, '../node_modules/' + dep), (exists) => {
                if(exists) {
                    done();
                } else {
                    done('Not Found');
                }
            });
        });
    });
});
