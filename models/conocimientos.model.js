const connectDB = require("../db/connection")

const crearConocimiento = async (nombre) => {

    const sql = 'INSERT INTO conocimientos (nombre) VALUES (?)'

    try {
        const connection = await connectDB()
        await connection.execute(sql, [nombre])
        return {estado: "success", mensaje: "Conocimiento guardado con exito."}
    } catch (error) {
        console.error('Error en conocimiento.model - crearConocimiento', error);
    }
}

const verConocimientos = async () => {

    const sql = 'SELECT * FROM conocimientos'

    try {
        const connection = await connectDB()
        const [results] = await connection.execute(sql)
        return {estado: "success", mensaje: "Conocimientos traidos desde la DB con exito", data: results}
    } catch (error) {
        console.error("Error en conocimientos.model - verConocimiento", error)
    }
}

module.exports = {
    crearConocimiento,
    verConocimientos
}