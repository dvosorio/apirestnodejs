const express = require('express')
const empleados = require('./../controllers/empleados.controller')

var route = express.Router();

route.post("/empleados", empleados.empleadosPost);
route.post("/login", empleados.authenticate);

module.exports = route;