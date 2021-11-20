const Empleados = require("./../models/empleados.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let empleadosPost = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            ok: false,
            message: "Content can not be empty!"
        });
    } else {
        const empleados = new Empleados({
            usuario:    req.body.usuario,
            clave:      bcrypt.hashSync(req.body.clave, 10),
            nombre:     req.body.nombre,
            apellido:   req.body.apellido,
            identidad:  req.body.identidad,
            correo:     req.body.correo,
            status:     req.body.status || '1'
        });

        Empleados.create(empleados, (err, data) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    message: err.message || 'An error occurred while creating the employee'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'The employee has been registered',
                    data: {
                        insert_id: data.id
                    }
                })
            }
        });
    }
}

let authenticate = (req, res)=> {
    if (!req.body) {
        res.status(400).json({
            ok: false,
            message: "Content can not be empty!"
        });
    } else {
        const usuario = req.body.usuario;
        const clave = req.body.clave;

        Empleados.findById(usuario, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    message: err.message || "An error occurred while retrieving the employee"
                });
            }

            if(!data){
                return res.status(404).json({
                    ok:false,
                    men: "Incorrect user"
                });
            }

            if(!bcrypt.compareSync(clave, data.clave)){
                return res.status(404).json({
                    ok:false,
                    men: "Incorrect password"
                });
            }

            let token = jwt.sign({
                data: data
            }, process.env.SECRET, { expiresIn: '2h' });

            res.json({
                ok: true,
                message: 'Correct username and password',
                data: {
                    authorization: token
                }
            });
        });
    }
    
}

module.exports = {
    empleadosPost,
    authenticate
}