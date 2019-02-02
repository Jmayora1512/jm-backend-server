var express = require('express');

var app = express();
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var SEED = require ('../config/config').SEED;

var Usuario = require('../models/usuario');



app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        console.log('UsuarioDB: ', usuarioDB);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });

        }

        // if ( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {

        //     return res.status(400).json({
        //         ok: false,
        //         mensaje: 'Credenciales incorrectas - password',
        //         errors: err
        //     });

        // }

        // Crear un token
        usuarioDB.password = ':)';

        // var token = jwt.sign({ usuario: usuarioDB }, 'este-es-un-seed-dificil',{ expiresIn: 14400 } ); // 4 horas
        // var token = jwt.sign({ usuario: usuarioDB }, SEED,{ expiresIn: 14400 } ); // 4 horas

        res.status(200).json({
            ok: true,
            usuarios: usuarioDB,
            // token: token,
            id: usuarioDB._id
        });

    });



});

module.exports = app;