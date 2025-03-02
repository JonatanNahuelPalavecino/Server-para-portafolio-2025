const { sendEmail } = require("../email/email")
const { verComentarios, crearComentario } = require("../models/comentario.model")

const watchcomments = async (req, res) => {

    const {filters} = req.body

    try {
        const data = await verComentarios(filters)
        res.status(200).json(data)
    } catch (error) {
        console.error("Error en comentario.controller - watchComments", error)
        res.status(500).json({estado: "error", mensaje: "Error al traer los comentarios desde la DB"})
    }
}

const createComment = async (req, res) => {

    const {comentario, id_proyecto, id_usuario, nombre_proyecto, user} = req.body

    try {
        const data = await crearComentario(comentario, id_proyecto, id_usuario)
        const {nombre, email} = user

        await sendEmail(
            [email], 
            `Gracias ${nombre} por tu comentario! - Jonatan Palavecino | Desarrollador Fullstack`, 
            "comentario", 
            {
                nombre, 
                nombre_proyecto,
                comentario
            }
        )

        res.status(201).json(data)
    } catch (error) {
        console.error("Error en comentario.controller - createComment", error)
        res.status(500).json({estado: "error", mensaje: "Error al crear el comentario"})
    }
}

module.exports = {
    watchcomments,
    createComment
}