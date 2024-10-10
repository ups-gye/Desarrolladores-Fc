const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function actualizar_usuario(dato) {
    const resultado = await model.findByIdAndUpdate(
        dato.id, // El ID del documento
        { nombre: dato.nombre, apellido: dato.apellido },  
        { new: true }  
    );
    return resultado;
}

async function eliminar_usuario(dato) {
    const resultado = await model.findByIdAndDelete(dato.id);
    return resultado;
}
module.exports = {
    insertar: insertar_usuario,
    obtener: obtener_usuario,
    actualizar: actualizar_usuario,
    eliminar: eliminar_usuario,
};