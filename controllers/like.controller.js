const {verMeGusta, crearMeGusta, eliminarMeGusta} = require("../models/like.model")
const dayjs = require('dayjs');

const watchLike = async (req, res) => {
    const {filters} = req.body

    try {
        const data = await verMeGusta(filters)
        res.status(200).json(data)
    } catch (error) {
        console.error("Error en like.controller - watchLike", error)
        res.status(500).json({estado: "error", mensaje: "Error al traer los me gusta desde la DB"})
    }
}

const createLike = async (req, res) => {

    const {id_proyecto, id_usuario} = req.body
    const date = dayjs().format('DD/MM/YYYY');

    try {
        const data = await crearMeGusta(date, id_proyecto, id_usuario)
        res.status(201).json(data)
    } catch (error) {
        console.log("Error en like.controller - createLike", error)
        res.status(500).json({estado: "error", mensaje: "Hubo un error para crear el like"})
    }
}

const deleteLike = async (req, res) => {

    const {id_proyecto, id_usuario} = req.body

    try {
        const data = await eliminarMeGusta(id_proyecto, id_usuario)
        res.status(200).json(data)
    } catch (error) {
        console.log("Error en like.controller - deleteLike", error)
        res.status(500).json({estado: "error", mensaje: "Hubo un error para eliminar el like"})
    }
}

module.exports = {
    watchLike,
    createLike,
    deleteLike
}