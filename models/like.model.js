const connectDB = require("../db/connection");
const { addParams } = require("../utils/addParams");
const { buscarUsuarioByFilter } = require("../models/auth.model");

const verMeGusta = async (filters = {}) => {
  const { sql, values } = addParams("SELECT * FROM me_gusta", filters);

  try {
    const connection = await connectDB();
    const [results] = await connection.execute(sql, values);

    const data = await Promise.all(
      results.map(async (like) => {
        const filters = { id_usuario: like.id_usuario };

        const user = await buscarUsuarioByFilter(filters);

        const { imagen_usuario, user_name } = await user.data;

        return {
          ...like,
          imagen_usuario: imagen_usuario,
          user_name: user_name,
        };
      })
    );

    return {
      estado: "success",
      mensaje: "Me gusta traidos desde la DB con exito",
      data: data,
    };
  } catch (error) {
    console.error("Error en projects.model - verProyectos", error);
  }
};

const crearMeGusta = async (fecha, id_proyecto, id_usuario) => {
  const sql =
    "INSERT INTO me_gusta (fecha_me_gusta, id_proyecto, id_usuario) VALUES (?, ?, ?)";

  try {
    const connection = await connectDB();
    await connection.execute(sql, [fecha, id_proyecto, id_usuario]);
    return { estado: "success", mensaje: "me gusta creado con exito." };
  } catch (error) {
    console.log("Error en like.model - crearMeGusta", error);
  }
};

const eliminarMeGusta = async (id_proyecto, id_usuario) => {
  const sql = "DELETE FROM me_gusta WHERE id_proyecto = ? AND id_usuario = ?";

  try {
    const connection = await connectDB();
    await connection.execute(sql, [id_proyecto, id_usuario]);
    return { estado: "success", mensaje: "me gusta eliminado con exito." };
  } catch (error) {
    console.log("Error en like.model - eliminarMeGusta", error);
  }
};

module.exports = {
  verMeGusta,
  crearMeGusta,
  eliminarMeGusta,
};
