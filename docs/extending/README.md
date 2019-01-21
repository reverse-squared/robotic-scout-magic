# Extending Robotic Scouting Magic
RSM is created using [React]() and [Material UI](), and a [Node.js]() server. It is all programmed to be very
modular so you can add new form components, export methods, and change the UI Style.

## Extending Table of Contents
- [Overview of the Code](#Overview-of-the-Code)
- [Setting up a development environment](#Setting-up-a-development-environment)
- [Creating New Form Fields](extending/fields.md)
- [Creating New Export Types](extending/exports.md)

## Setting up a development environment
1. To start, make sure you have [Node.js](https://nodejs.org/) and [Node GYP](https://github.com/nodejs/node-gyp#installation) installed.
2. Clone or download this repository to a folder somewhere on the device.
3. Run `npm i -D` to install all the needed dependencies.
4. Run `npm start` or `node .` to start the server and access the hot reloading page at `http://localhost:8000/`.

> This is very similar to the produciton server, but the code produced in development mode is not optimized and some things are different. For example, forms marked as hidden will always show in this mode.


## Overview of the Code
Coming soon!
