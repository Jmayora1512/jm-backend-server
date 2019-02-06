// var express = require('express');

// var app = express();

// app.get('/', (req, res, next) => {

//     res.status(200).json({
//         ok: true,
//         mensaje: 'Peteción realizada correctamente - Medico'
//     });

// });

// module.exports = app;

// ===================================================================

var express = require('express');

var app = express();

// var mdAutenticacion = require('../middlewares/autenticacion');

var Medico = require('../models/medico');

// ===========================================
// Obtener todos los medicos
//============================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec(
            (err, medicos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospital!',
                        errors: err
                    });
                }

                Medico.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        medicos: medicos,
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
// Actualizar  medico
//============================================
// app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {



        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico!',
                errors: err
            });
        }

        if (!medico) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El medico con el id ' + id + ' no existe',
                    errors: { message: 'No existe un medico con ese ID' }
                });
            }

        }

        medico.nombre = body.nombre;
        // medico.usuario = req.usuario._id;
        medico.usuario = body.usuario;
        medico.hospital = body.hospital;


        medico.save((err, medicoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico!',
                    errors: err
                });
            }

            medicoGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                medico: medicoGuardado,
                // medicotoken: req.medico
            });

        });

    });



})

// ===========================================
// Crea  un nuevo medico
//============================================

// app.post('/', mdAutenticacion.verificaToken, (req, res) => {
app.post('/', (req, res) => {

    var body = req.body;

    // console.log(body.usuario);
    // console.log(body.hospital);

    var medico = new Medico({
        nombre: body.nombre,
        usuario: body.usuario,
        //  usuario: req.usuario._id
        hospital: body.hospital,
    });



    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico!',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado,
        });


    });


});

// ===========================================
// Borrar  un nuevo medico por el ID
//============================================
// app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico!',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'NO existe un medico con ese ID',
                errors: { message: 'NO existe un medico con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });

    });


});

module.exports = app;