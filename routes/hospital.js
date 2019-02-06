// var express = require('express');

// var app = express();

// app.get('/', (req, res, next) => {

//     res.status(200).json({
//         ok: true,
//         mensaje: 'Peteción realizada correctamente - hospital'
//     });

// });

// module.exports = app;
// ==================================================================

var express = require('express');

var app = express();

// var mdAutenticacion = require('../middlewares/autenticacion');

var Hospital = require('../models/hospital');

// ===========================================
// Obtener todos los hospitales
//============================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospital!',
                        errors: err
                    });
                }

                Hospital.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: conteo
                    });

                });



            });
});

// ===========================================
// Verificar token
//============================================
// app.use('/', (req, res, next) => {

//     var token = req.query.token;

//     jwt.verify( token, SEED, ( err, decoded ) => {

//         if (err) {
//             return res.status(401).json({
//                 ok: false,
//                 mensaje: 'Token incorrecto',
//                 errors: err
//             });
//         }

//         next();

//     } );

// });




// ===========================================
// Actualizar  hospital
//============================================
// app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {



        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital!',
                errors: err
            });
        }

        if (!hospital) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El hospital con el id ' + id + ' no existe',
                    errors: { message: 'No existe un hospital con ese ID' }
                });
            }

        }

        hospital.nombre = body.nombre;
        // hospital.usuario = req.usuario._id;


        hospital.save((err, hospitalGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital!',
                    errors: err
                });
            }

            hospitalGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado,
                // hospitaltoken: req.hospital
            });

        });

    });



})

// ===========================================
// Crea  un nuevo hospital
//============================================

// app.post('/', mdAutenticacion.verificaToken, (req, res) => {
app.post('/', (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: body.usuario
            //  usuario: req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital!',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
        });


    });


});

// ===========================================
// Borrar  un nuevo hospital por el ID
//============================================
// app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital!',
                errors: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'NO existe un hospital con ese ID',
                errors: { message: 'NO existe un hospital con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });

    });


});

module.exports = app;