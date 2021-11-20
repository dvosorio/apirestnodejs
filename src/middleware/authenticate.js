const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.get("Authorization");

    if (!token) {
        return res.status(500).json({
            ok: false,
            message: "Missing validations in the header"
        });
    } else {
        jwt.verify(token, process.env.SECRET, (err, data)=>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    message: "Token not valid"
                });
            }
    
            req.empleado = data.data.id;
    
            next();
        });
    }
}

let token_imagen = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SECRET, (err, usuario)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                men: "Token no valido"
            });
        }

        req.usuario = usuario.data;

        next();
    });
}

module.exports = {
    auth,
    token_imagen
}