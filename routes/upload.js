var express = require('express');
var fileUpload = require('express-fileupload');

// var fs = require('fs');

var app = express();

// var Usuario = require('../models/usuario');
// var Medico = require('../models/medico');
// var Hospital = require('../models/hospital');

// default options
app.use(fileUpload());

// app.put('/:tipo/:id', (req, res, next) => {
// var tipo = req.params.tipo;
// var id = req.params.id;

//tipos de coleccion
// var tiposValidos = ['hospitales','medicos','usuarios'];

// if (tiposValidos.indexOf(tipo) < 0) {
//     return res.status(400).json({
//         ok: false,
//         mensaje: 'Tipo de colleccion no es valiva',
//         errors: { message: 'Tipo de colleccion no es valiva' }
//     });
// }

app.put('/', (req, res, next) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    // var archivo = req.files.imagen;
    //  var nombreCortado = archivo.name.split('.');
    // var extesionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo estas estas extensiones aceptamos

    // var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    // if (extencionesValidas.indexOf(extesionArchivo) < 0) {
    //     return res.status(400).json({
    //         ok: false,
    //         mensaje: 'Extension no valida',
    //         errors: { message: 'La extensiones validas son: ' + extencionesValidas.join(', ') }
    //     });
    // }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.extesionArchivo `;

    // Mover el archivo del temporal a un path
    var path = `./uploads/${tipo }/nombreArchivo `;

    nombreArchivo.mv(path, err => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al mover al mover el archivo',
                errors: err
            });
        }

        //   subirPorTipo( tipo, id, nombreArchivo, res )




    })

    // No va cuando se corrija va solo el de arriba Archivo movido
    res.status(200).json({
        ok: true,
        mensaje: 'Peteción realizada correctamente - Upload'
    });

});

// function subirPorTipo( tipo, id, nombreArchivo, res ){

//     if( tipo === 'usuarios'){
//         Usuario.findByid( id, (err, usuario) => {
//             var pathViejo = './uploads/usuarios' + usuario.img;

//             // Si existe elimina la imagen anterior
//             if( fs.exitsSync(pathViejo)){
//                 fs.unlink( pathViejo );
//             }

//             usuario.img = nombreArchivo;
//             usuario.save( (err, usuarioActualizado) => {

//                 usuarioActualizado.password = ':)';

//                return res.status(200).json({
//                     ok: true,
//                     mensaje: 'Imagen de usuario actualizada',
//                     usuario: usuarioActualizado
//                 });

//             } );


//         } );

//     }

//     if( tipo === 'medicos'){
//         Medico.findByid( id, (err, medico) => {
//             var pathViejo = './uploads/medicos' + medico.img;

//             // Si existe elimina la imagen anterior
//             if( fs.exitsSync(pathViejo)){
//                 fs.unlink( pathViejo );
//             }

//             medico.img = nombreArchivo;
//             medico.save( (err, medicoActualizado) => {



//                return res.status(200).json({
//                     ok: true,
//                     mensaje: 'Imagen de medico actualizada',
//                     medico: medicoActualizado
//                 });

//             } );


//         } ); 
//     }

//     if( tipo === 'hospitales'){
//         Hospital.findByid( id, (err, hospital) => {
//             var pathViejo = './uploads/hospitales' + hospital.img;

//             // Si existe elimina la imagen anterior
//             if( fs.exitsSync(pathViejo)){
//                 fs.unlink( pathViejo );
//             }

//             hospital.img = nombreArchivo;
//             hospital.save( (err, hospitalActualizado) => {


//                return res.status(200).json({
//                     ok: true,
//                     mensaje: 'Imagen de hospital actualizada',
//                     hospital: hospitalActualizado
//                 });

//             } );


//         } );        
//     }

}

module.exports = app;