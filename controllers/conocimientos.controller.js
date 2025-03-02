const {verConocimientos, crearConocimiento} = require("../models/conocimientos.model")
const {verDetalles} = require("../models/detalle.model")

const createKnowledge = async (req, res) => {
    const {nombre} = req.body

    try {
        const data = await crearConocimiento(nombre)
        res.status(201).json(data)
    } catch (error) {
        console.error("Error en conocimiento.controller - createKnowledge", error)
        res.status(500).json({estado: "error", mensaje: "Error al crear el conocimiento"})
    }
}

const watchKnowledge = async (req, res) => {

    try {
        const data = await verConocimientos()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error en conocimiento.controller - watchKnowledge", error)
        res.status(500).json({estado: "error", mensaje: "Error al traer los conocimientos desde la DB"})
    }
}

const watchFullKnowledge = async (req, res) => {

    try {
        const conocimientos = await verConocimientos()
        const detalle = await verDetalles()

        conocimientos.data.map((skill) => {
            skill.detalle = detalle.data.filter(el => el.id_conocimiento === skill.id_conocimiento)
        })

        res.status(200).json(conocimientos.data)

    } catch (error) {
        console.error("Error en conocimiento.controller - watchFullKnowledge", error)
        res.status(500).json({estado: "error", mensaje: "Error al traer los conocimientos completos desde la DB"})
    }
}

module.exports = {
    createKnowledge,
    watchKnowledge,
    watchFullKnowledge
}