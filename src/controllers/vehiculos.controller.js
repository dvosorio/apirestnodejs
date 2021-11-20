const Vehiculos = require("./../models/vehiculos.model");
const path      = require("path");
const xlsxFile  = require('read-excel-file/node');

let vehiculosImagen = (req, res) => {
    let ruta = path.join(__dirname, './../../uploads/', req.params.img);
    return res.sendFile(ruta);
}

let vehiculosGet = (req, res) => {
    Vehiculos.findAll((err, data) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: res.message || 'An error occurred when retrieving vehicles'
            })
        } else {
            res.json({
                ok: true,
                message: 'Vehicles found',
                data: data
            })
        }
    })
}

let vehiculosPost = (req, res) => {
    let permitidos = ['.jpeg', '.jpg', '.png']

    if (!req.body) {
        return res.status(400).json({
            ok: false,
            message: "Content can not be empty!"
        });
    }

    if (!req.files)
        return res.status(400).json({ok: false, message: 'No files were uploaded'});

    let imagen = req.files.imagen;

    if (!permitidos.find(file => file === path.extname(imagen.name)))
        return res.status(400).json({ok: false, message: 'File not allowed'});


    imagen.mv(`./uploads/${imagen.name}`, err => {
        if (err)
            return res.status(500).json({ok: false, message: err.message});

        let today   = new Date();
        let day     = today.getDate();
        var valorI  = 200000;

        if(day % 2 == 0) {
            valorI = valorI + ((valorI * 5) / 100);
        }

        if (req.body.modelo === '1997') {
            valorI = valorI + ((valorI * 20) / 100);
        }

        let vehiculos = new Vehiculos({
            responsable:    req.empleado,
            imagen:         imagen.name,
            placa:          req.body.placa,
            marca:          req.body.marca,
            color:          req.body.color,
            modelo:         req.body.modelo,
            valor:          valorI,
            status:         req.body.status || '1'
        });

        Vehiculos.create(vehiculos, (err, data) => {
            if (err)
                return res.status(500).json({ok: false, message: err.message});

            return res.json({ok: true, message: 'The vehicle has been registered'});
        })
    })
}

let vehiculosIdGet = (req, res) => {

    Vehiculos.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: res.message || 'An error occurred when retrieving vehicles'
            })
        } else {
            res.json({
                ok: true,
                message: 'Vehicle',
                data: data[0]
            })
        }
    })
}

let vehiculosPut = (req, res) => {
    let permitidos = ['.png', '.jpg', '.jpeg']

    if (!req.body) {
        return res.status(400).json({
            ok: false,
            message: "Content can not be empty!"
        });
    }

    if (!req.files) {
        let vehiculos = new Vehiculos({
            imagen:         req.body.imagen_,
            placa:          req.body.placa,
            marca:          req.body.marca,
            color:          req.body.color,
            modelo:         req.body.modelo,
            valor:          req.body.valor,
        });

        Vehiculos.updateById(req.params.id, vehiculos, (err, data) => {
            if (err)
                return res.status(500).json({ok: false, message: err.message});

            return res.json({ok: true, message: 'The vehicle has been upgraded'});
        })
    } else {
        let imagen = req.files.imagen;

        if (!permitidos.find(file => file === path.extname(imagen.name)))
            return res.status(400).json({ok: false, message: 'File not allowed'});


        imagen.mv(`./uploads/${imagen.name}`, err => {
            if (err)
                return res.status(500).json({ok: false, message: err.message});

            let vehiculos = new Vehiculos({
                imagen:         imagen.name,
                placa:          req.body.placa,
                marca:          req.body.marca,
                color:          req.body.color,
                modelo:         req.body.modelo,
                valor:          req.body.valor,
            });

            Vehiculos.updateById(req.params.id, vehiculos, (err, data) => {
                if (err)
                    return res.status(500).json({ok: false, message: err.message});

                return res.json({ok: true, message: 'The vehicle has been upgraded'});
            })
        })
    }
}

let vehiculosDelete = (req, res) => {
    Vehiculos.removeId(req.params.id, (err, data) => {
        if (err)
            return res.status(500).json({ok: false, message: err.message})

        Vehiculos.findAll((err, data) => {
            if (err) 
                return res.status(500).json({ok: false, message: res.message || 'An error occurred when retrieving vehicles'})

            res.json({
                ok: true,
                message: 'Vehicles found',
                data: data
            })
        })
    })
}

let uploadExcel = (req, res) => {
    let permitidos = ['.xlsx', '.xls']
    let resultados = 0;
    let resultadosTotal = 0;

    if (!req.files)
        return res.status(400).json({ok: false, message: 'No files were uploaded'});

    const excel = req.files.excel;

    if (!permitidos.find(file => file === path.extname(excel.name))) 
        return res.status(400).json({ok: false, message: 'File not allowed'});

    excel.mv(`./uploads/${excel.name}`, err => {
        if (err)
            return res.status(500).json({ok: false, message: err.message});
    })

    xlsxFile(`./uploads/${excel.name}`).then((rows, err) => {
        resultadosTotal = rows.length

        rows.forEach((col, index) => {
            if (index > 0) {
                Vehiculos.findByPlate(col[0], (err, data) => {
                    console.log(data);
                    if (err) {
                        return res.status(500).json({ok: false, message: err.message});
                    }

                    if(data.length == 0){
                        let today   = new Date();
                        let day     = today.getDate();
                        var valorI  = 200000;

                        if(day % 2 == 0) {
                            valorI = ((valorI * 5) / 100);
                        }

                        if (col[3] === '1997') {
                            valorI = ((valorI * 20) / 100);
                        }

                        let vehiculos = new Vehiculos({
                            responsable:    req.empleado,
                            imagen:         'default.jpg',
                            placa:          col[0],
                            marca:          col[1],
                            color:          col[2],
                            modelo:         col[3],
                            valor:          valorI,
                            status:         '1'
                        });
                
                        Vehiculos.create(vehiculos, (err, data) => {
                            if (err) {
                                console.log({ok: false, message: err.message});
                                res.status(500).json({ok: false, message: err.message});
                            }
                        })
                    } else {
                        let vehiculos = new Vehiculos({
                            responsable:    req.empleado,
                            imagen:         'default.jpg',
                            placa:          col[0],
                            marca:          col[1],
                            color:          col[2],
                            modelo:         col[3],
                            valor:          200000,
                            status:         '1'
                        });
                
                        Vehiculos.updateByPlate(vehiculos, (err, data) => {
                            if (err) {
                                return res.status(500).json({ok: false, message: err.message});
                            }
                        })
                    }
                });

                resultados++
            }
        })
    }).catch(err => {
        console.log(err);
    })

    if (resultados !== resultadosTotal)
        return res.json({ok: false, message: `The number of vehicles registered is: ${resultados}`})

    if (resultados === resultadosTotal)
        return res.json({ok: true, message: 'All vehicles have been registered'})
}

module.exports = {
    vehiculosImagen,
    vehiculosGet,
    vehiculosPost,
    vehiculosIdGet,
    vehiculosPut,
    vehiculosDelete,
    uploadExcel
}