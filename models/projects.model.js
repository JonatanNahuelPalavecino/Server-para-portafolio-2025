const connectDB = require("../db/connection");
const {addParams} = require("../utils/addParams")

const crearProyecto = async (
  nombre,
  introduccion,
  descripcion,
  github_fe,
  github_be,
  link,
  imagen_project
) => {
  const sql =
    "INSERT INTO projects (nombre, introduccion, descripcion, github_fe, github_be, link, imagen_project) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    const connection = await connectDB();
    const [result] = await connection.execute(sql, [
      nombre,
      introduccion,
      descripcion,
      github_fe,
      github_be,
      link,
      imagen_project,
    ]);
    return result.insertId;
  } catch (error) {
    console.error("Error en projects.model - crearProyecto", error);
  }
};

const verProyectos = async (filters = {}) => {

  const {sql, values} = addParams("SELECT * FROM projects", filters);

  try {
    const connection = await connectDB();
    const [results] = await connection.execute(sql, values);
    return {
      estado: "success",
      mensaje: "Proyectos traidos desde la DB con exito",
      data: results,
    };
  } catch (error) {
    console.error("Error en projects.model - verProyectos", error);
  }
};

module.exports = {
  crearProyecto,
  verProyectos,
};
