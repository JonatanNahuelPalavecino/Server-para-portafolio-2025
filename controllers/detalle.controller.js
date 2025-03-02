const {verDetalles, crearDetalle} = require("../models/detalle.model")

const createDetail = async (req, res) => {

    const {id_conocimiento, detalle} = req.body

    try {
        const data = await crearDetalle(id_conocimiento, detalle)
        res.status(201).json(data)
    } catch (error) {
        console.log("Error en detalle.controller - createDetail", error)
        res.status(500).json({estado: "error", mensaje: "Hubo un error al crear el detalle."})
    }
}

const watchDetail = async (req, res) => {

    try {
        const data = await verDetalles()
        res.status(200).json(data)
    } catch (error) {
        console.log("Error en detalle.controller - watchDetail", error)
        res.status(500).json({estado: "error", mensaje: "Hubo un error al traer los detalles de la DB."})
    }
}

module.exports = {
    createDetail,
    watchDetail
}