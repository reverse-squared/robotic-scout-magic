// This starts the webpack dev server, and the API server and merges them
// on the same port. Use for development.
/* eslint-disable no-console */
const proxyMiddleware = require('proxy-middleware');
const chokidar = require('chokidar');
const express = require('express');
const url = require('url');
const chalk = require('chalk');
const path = require('path');
const reload = require('require-reload');
const npmRunScript = require('npm-run-script');

const app = express();
let api = reload(path.join(__dirname, 'api'));
chokidar.watch('./server/api.js').on('change', () => {
    console.log(chalk.cyan('Reloading API.js'));
    api = reload(path.join(__dirname, 'api'));
});
const proxy = proxyMiddleware('/', {
    target: url.parse('http://127.0.0.1:80'),
    ws: true
});
app.use((req,res,next) => {
    api(req,res,next);
});
app.use(proxy);

const child = npmRunScript('webpack-dev-server --port 80', { stdio: 'pipe' });

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', api.onSocket);

child.stdin.pipe(process.stdin);
child.stdout.on('data', (data) => {
    // Filter out the "Project is running at localhost:80" message
    if(data.toString().indexOf('Project is running at') !== -1) {
        http.listen(8000, function () {
            console.log(chalk.green('Started Server: http://localhost:8000/'));
        });
        return;
    }
    process.stdout.write(data);
});

child.stderr.pipe(process.stderr);

