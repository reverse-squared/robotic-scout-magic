# Robotic Scout Magic (RSM)
> A ~~mockup~~ working prototype for a FRC scouting web app.

## Getting Started
1. To start, make sure you have [Node.js](https://nodejs.org/en/) installed.
2. Clone or download this repository to a folder somewhere on the device.
3. Run `npm i -D && npm run build` to install all the needed dependencies.
3. Install [panr](https://github.com/emmercm/panr) and set it up on the machine that is running the server.
4. Run `npm run production` to start the server and access the form page at `http://localhost:80/`.
5. If you connect external devices, connect to the server though the PAN network, and instead of `localhost`, use the server's local IP. You can find this
by running `ipconfig` in the console.

> By default, form data is customized for 2019 FRC Destination: Deep Space.

## Why Bluetooth?
RSM uses bluetooth for it's connections to it's devices because WiFi access points are banned at competitions.
![](http://i.imgur.com/aKL8OjC.png)

## Licensing
This software is under the MIT Licesne, meaning you can do what ever you want to it. ~~Just don't sue us.~~
