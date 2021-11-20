const express = require('express')
const ventasController = require('./../controllers/vehiculos.controller')
const { auth }  = require("./../middleware/authenticate");

var route = express.Router()

route.get('/vehiculos', auth, ventasController.vehiculosGet)
route.post('/vehiculos', auth, ventasController.vehiculosPost)
route.get('/vehiculos/:id', auth, ventasController.vehiculosIdGet)
route.put('/vehiculos/:id', auth, ventasController.vehiculosPut)
route.delete('/vehiculos/:id', auth, ventasController.vehiculosDelete)
route.post('/vehiculos/upload', auth, ventasController.uploadExcel)
route.get("/vehiculos/imagen/:img", ventasController.vehiculosImagen);

module.exports = route;
