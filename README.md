# Robotic Scout Magic (RSM)
> A ~~mockup~~ working prototype for a FRC scouting web app.

## Getting Started
1. To start, make sure you have [Node.js](https://nodejs.org/en/) installed.
2. Clone or download this repository to a folder somewhere on the device.
3. Run `npm i -D && npm run build` to install all the needed dependencies.
3. Install [panr](https://github.com/emmercm/panr) and set it up on the machine that is running the server.
4. Run `npm run production` to start the server and access the form page at `http://localhost:8000/`.
5. If you connect external devices, connect to the server though the PAN network, and instead of `localhost`, use the server's local IP. You can find this
by running `ipconfig` in the console.

> It is important that you run `npm i -D && npm run build` before your start the production server, as the rendering happens from the dist/ folder. Also remember to do this if you ever update RSM.

## Why Bluetooth?
RSM uses bluetooth for it's connections to it's devices because WiFi access points are banned at competitions.
![no-wifi](https://i.imgur.com/fN10Xx1.png)
Soruce at [https://firstfrc.blob.core.windows.net/frc2019/EventRules/EventRulesManual.pdf](https://firstfrc.blob.core.windows.net/frc2019/EventRules/EventRulesManual.pdf).

## Documentation
You can view the full documentation for RSM including how to create, edit, and export form data at [https://wearedevs.github.io/robotic-scout-magic/](https://wearedevs.github.io/robotic-scout-magic/).

## Licensing
This software is under the MIT License, meaning you can do what ever you want with it. ~~Just don't sue us.~~
