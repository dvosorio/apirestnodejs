const express = require('express');

var app = express();

app.use("/api", require("./vehiculos"));
app.use("/api", require("./empleados"));

module.exports = app;