const connectDB = require("../db/connection");
const { addParams } = require("../utils/addParams");
const { buscarUsuarioByFilter } = require("../models/auth.model");

const verComentarios = async (filters = {}) => {
  const { sql, values } = addParams("SELECT * FROM comentarios", filters);

  try {
    const connection = await connectDB();
    const [results] = await connection.execute(sql, values);

    const data = await Promise.all(
      results.map(async (comentario) => {
        const filters = { id_usuario: comentario.id_usuario };

        const user = await buscarUsuarioByFilter(filters);

        const { imagen_usuario, user_name } = user.data;

        return {
          ...comentario,
          imagen_usuario: imagen_usuario,
          user_name: user_name,
        };
      })
    );

    return {
      estado: "success",
      mensaje: "Comentarios traidos desde la DB con exito",
      data: data,
    };
  } catch (error) {
    console.error("Error en comentario.model - verComentarios", error);
  }
};

const crearComentario = async (comentario, id_proyecto, id_usuario) => {
  const sql = `INSERT INTO comentarios (comentario, id_proyecto, id_usuario) VALUES (?, ?, ?)`;

  try {
    const connection = await connectDB();
    await connection.execute(sql, [comentario, id_proyecto, id_usuario]);

    return { estado: "success", mensaje: "Comentario guardado con exito" };
  } catch (error) {
    console.error("Error en comentario.model - crearComentario", error);
  }
};

module.exports = {
  verComentarios,
  crearComentario,
};
