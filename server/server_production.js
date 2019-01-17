const express = require("express");
const path = require("path");
const api = require("./api");

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));
app.use(api);

app.listen(8000);

// eslint-disable-next-line no-console
console.log("Production Server running at http://localhost:8000/");
