const db = require("./../config/db");

// constructor
const Vehiculos = function(vehiculos) {
    this.responsable    = vehiculos.responsable;
    this.imagen         = vehiculos.imagen;
    this.placa          = vehiculos.placa;
    this.marca          = vehiculos.marca;
    this.color          = vehiculos.color;
    this.modelo         = vehiculos.modelo;
    this.valor          = vehiculos.valor;
    this.status         = vehiculos.status;
};

Vehiculos.create = (newVehiculos, result) => {
    const { responsable, imagen, placa, marca, color, modelo, valor, status } = newVehiculos
    
    db.query("INSERT INTO vehiculos(id_empleado, imagen, placa, marca, color, modelo, valor, status) VALUES(?,?,?,?,?,?,?,?)", [responsable, imagen, placa, marca, color, modelo, valor, status], (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, { id: res.insertId })
    })
}

Vehiculos.createHistory = (newHosroty, result) => {
    const { empleado, accion } = newHosroty
    
    db.query("INSERT INTO historial(responsable, accion) VALUES(?,?)", [empleado, accion], (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, { id: res.insertId })
    })
}

Vehiculos.findAll = result => {    
    db.query(`SELECT id, (SELECT CONCAT(nombre, ' ', apellido) FROM empleados WHERE id = v.id_empleado) as responsable, imagen, placa, marca, color, modelo, valor, status, fecha_ingreso FROM vehiculos as v ORDER BY status DESC`, (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

Vehiculos.findById = (id, result) => {    
    db.query(`SELECT id, imagen, placa, marca, color, modelo, valor FROM vehiculos WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

Vehiculos.findByPlate = (placa, result) => {    
    db.query(`SELECT id FROM vehiculos WHERE placa = '${placa}'`, (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

Vehiculos.updateById = (id, vehiculos, result) => {
    const { imagen, placa, marca, color, modelo, valor } = vehiculos
    
    db.query(`UPDATE vehiculos SET imagen = '${imagen}', placa = '${placa}', marca = '${marca}', color = '${color}', modelo = '${modelo}', valor = '${valor}' WHERE id = ?`, [id], (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

Vehiculos.updateByPlate = (vehiculos, result) => {
    const { placa, marca, color, modelo, valor, status } = vehiculos
    
    db.query(`UPDATE vehiculos SET marca = '${marca}', color = '${color}', modelo = '${modelo}', valor = '${valor}', status = '${status}' WHERE placa = ?`, [placa], (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

Vehiculos.removeId = (id, result) => {
    db.query(`UPDATE vehiculos SET status = '0' WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null)
        }

        result(null, res)
    })
}

module.exports = Vehiculos