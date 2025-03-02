const { addParams } = require("../utils/addParams")
const connectDB = require("../db/connection")

const buscarVisita = async (filters = {}) => {

    const {sql, values} = addParams("SELECT * FROM visitas", filters)

    try {
        const connection = await connectDB();
        const [results] = await connection.execute(sql, values);
        return results
      } catch (error) {
        console.error("Error en visitas.model - buscarVisita", error);
      }
}

const registrarVisita = async (ip, user_agent, ruta, fecha, id_usuario, referer) => {

    const sql = "INSERT INTO visitas (ip, user_agent, ruta, fecha, id_usuario, referer) VALUES (?, ?, ?, ?, ?, ?)"

    try {
        const connection = await connectDB()
        await connection.execute(sql, [ip, user_agent, ruta, fecha, id_usuario, referer])
        return true
    } catch (error) {
        console.error("Error en visitas.model - registrarVisita", error);
    }
}

module.exports = {
    registrarVisita,
    buscarVisita
}