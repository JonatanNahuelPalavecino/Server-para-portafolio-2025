const dayjs = require("dayjs");
const { registrarVisita, buscarVisita } = require("../models/visitas.model");

const addVisit = async (req, res) => {
  const { ruta, user_agent, referer, id_usuario, ip } = req.body;
  const fecha = dayjs().format("DD/MM/YYYY");
  
  const filters = { ip, user_agent, ruta, fecha, id_usuario, referer };

  try {
    const busqueda = await buscarVisita(filters);

    if (busqueda.length > 0) {
      const { ip, user_agent, ruta, fecha, id_usuario, referer } = busqueda[0];

      if (
        filters.ip === ip &&
        filters.user_agent === user_agent &&
        filters.ruta === ruta &&
        filters.fecha === fecha &&
        filters.id_usuario === id_usuario &&
        filters.referer === referer
      ) {
        res.status(400).json({mensaje: "Visita ya registrada"});
        return
      }
    }

    const result = await registrarVisita(
      ip,
      user_agent,
      ruta,
      fecha,
      id_usuario,
      referer
    );

    res.status(200).json({mensaje: "Visita registrada con exito", estado: result})
  } catch (error) {
    console.error("Error en visitas.controller - addVisit", error);
    res.status(500).json({mensaje: "Hubo un error con el servidor"});
  }
};

module.exports = { addVisit };
