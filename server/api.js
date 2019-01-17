const express = require("express");

const api = express.Router();

api.get("/api", (req, res) => {
    res.send("Hello World from Express.");
});

module.exports = api;