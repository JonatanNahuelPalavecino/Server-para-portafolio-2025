const connectDB = require("../db/connection")

const cargarContacto = async (nombre, apellido, telefono, email, mensaje) => {

    const sql = "INSERT INTO contacto (nombre, apellido, telefono, email, mensaje) VALUES (?, ?, ?, ?, ?)"

    try {
        const connection = await connectDB()
        await connection.execute(sql, [nombre, apellido, telefono, email, mensaje])
        return {estado: "success", mensaje: "Mensaje guardado con exito."}
    } catch (error) {
        console.error('Error en contacto.model - crearComentario', error);
    }
}

module.exports = {cargarContacto}