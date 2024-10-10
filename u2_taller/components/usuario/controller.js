const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}


function actualizar_usuario(dato) {
    return new Promise((resolve, reject) => {
        if (!dato.id || (!dato.nombre && !dato.apellido)) {
            reject('Datos incompletos para actualizar.');
        } else {
            resolve(storage.actualizar(dato));
        }
    });
}

function eliminar_usuario(dato) {
    return new Promise((resolve, reject) => {
        if (!dato.id) {
            reject('Se necesita un ID para eliminar.');
        } else {
            resolve(storage.eliminar(dato));
        }
    });
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario
};