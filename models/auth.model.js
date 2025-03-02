const connectDB = require('../db/connection');
const { addParams } = require('../utils/addParams');

const buscarUsuario = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    try {
        const connection = await connectDB();
        const [results] = await connection.execute(sql, [email]);
        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en auth.model - buscarUsuario', error);
    } 
};

const buscarUsuarioByFilter = async (filters = {}) => {
    const {sql, values} = addParams("SELECT * FROM users", filters)

    try {        
        const connection = await connectDB()
        const [results] = await connection.execute(sql, values)
        const {id_usuario, user_name, nombre, apellido, email, imagen_usuario} = results[0]
        return {estado: "success", mensaje: "Usuario traido desde la DB con exito", data: {id_usuario, user_name, nombre, apellido, email, imagen_usuario}}
    } catch (error) {
        console.error("Error en comentario.model - verComentarios", error)
        return []
    }
}

const crearUsuario = async (userName, nombre, apellido, email, password, imagen_usuario) => {
    const sql = 'INSERT INTO users (user_name, nombre, apellido, email, password, imagen_usuario, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(sql, [userName, nombre, apellido, email, password, imagen_usuario, 1]);
        return result.insertId;
    } catch (error) {
        console.error('Error en auth.model - crearUsuario', error);
    } 
};

const desactivarUsuario = async (id_usuario) => {
    const sql ="UPDATE users SET activo = 0 WHERE id_usuario = ?"

    try {
        const connection = await connectDB()
        await connection.execute(sql, [id_usuario])
        return {estado: "success", mensaje:"Usuario desactivado de manera exitosa"}
    } catch (error) {
        console.error('Error en auth.model - desactivarUsuario', error);
    }
}

const activarUsuario = async (id_usuario) => {
    const sql ="UPDATE users SET activo = 1 WHERE id_usuario = ?"

    try {
        const connection = await connectDB()
        await connection.execute(sql, [id_usuario])
        return {estado: "success", mensaje:"Usuario activado de manera exitosa. Vuelve a iniciar sesión"}
    } catch (error) {
        console.error('Error en auth.model - activarUsuario', error);
    }
}

module.exports = { buscarUsuario, buscarUsuarioByFilter, crearUsuario, desactivarUsuario, activarUsuario };
