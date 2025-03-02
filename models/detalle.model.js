const connectDB = require("../db/connection")

const crearDetalle = async (id_conocimiento, detalle) => {

    const sql = 'INSERT INTO detalle (id_conocimiento, detalle) VALUES (?, ?)'

    try {
        const connection = await connectDB()
        await connection.execute(sql, [id_conocimiento, detalle])
        return {estado: "success", mensaje: "Detalle creado con exito."}
    } catch (error) {
        console.log("Error en detalle.model - crearDetalle", error)
    }
}

const verDetalles = async () => {

    const sql = "SELECT * FROM detalle"

    try {
        const connection = await connectDB()
        const [result] = await connection.execute(sql)
        return {estado: "success", mensaje: "Detalles traidos desde la DB con exito", data: result}
    } catch (error) {
        console.log("Error en detalle.model - verDetalles", error)
    }
}

module.exports = {
    crearDetalle,
    verDetalles
}