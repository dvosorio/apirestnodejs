const db = require("./../config/db");

// constructor
const Empleado      = function(empleado) {
    this.usuario    = empleado.usuario;
    this.clave      = empleado.clave;
    this.nombre     = empleado.nombre;
    this.apellido   = empleado.apellido;
    this.identidad  = empleado.identidad;
    this.correo     = empleado.correo;
    this.status     = empleado.status;
};

Empleado.create = (newEmpleado, result) => {
    const { usuario, clave, nombre, apellido, identidad, correo, status } = newEmpleado
    
    db.query("INSERT INTO empleados(usuario, clave, nombre, apellido, identidad, correo, status) VALUES(?,?,?,?,?,?,?)", [usuario, clave, nombre, apellido, identidad, correo, status], (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, { id: res.insertId })
    })
}

Empleado.findById = (usuario, result) => {
    db.query(`SELECT * FROM empleados WHERE usuario = '${usuario}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
    });
};

module.exports = Empleado;