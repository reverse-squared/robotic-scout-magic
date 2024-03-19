# Robotic Scout Magic (RSM)
> A FRC scouting web app.

- Completly customizable forms built with JSON.
- Export to CSV, HTML, or JSON from the Web App.
- Very extensible with React and Material-UI.
- Available for offline use after loading the app once.

*Originally forked from [reverse-squared/robotic-scout-magic](https://github.com/reverse-squared/robotic-scout-magic)*
*Modified and updated by [Filip](https://github.com/Filip9696)*

## Getting Started
1. To start, make sure you have [Node.js](https://nodejs.org/) and [Node GYP](https://github.com/nodejs/node-gyp#installation) installed.
2. Clone or download this repository to a folder somewhere on your server.
3. Run `npm i -D && npm run build` to install all the needed dependencies.
4. Run `npm run production` to start the server and access the form page at `http://localhost:8000/`.
5. Setup HTTPS and a proxy on your server (probably using apache2 and certbot) so you can access it externally and have it load for offline use
6. Instruct scouters to visit the website atleast once before going to competition so that it's loaded

> It is very important that you run `npm i -D && npm run build` before your start the production server, as the rendering happens from the dist/ folder. Also remember to do this if you ever update RSM.
