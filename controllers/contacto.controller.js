const { sendEmail } = require("../email/email")
const {cargarContacto} = require("../models/contacto.model")

const createContact = async (req, res) => {
    const {nombre, apellido, telefono, email, mensaje} = req.body

    try {
        const data = await cargarContacto(nombre, apellido, telefono, email, mensaje)

        await sendEmail(
            [email], 
            `Gracias ${nombre} por tu contacto! - Jonatan Palavecino | Desarrollador Fullstack`, 
            "contacto", 
            {
                nombre, 
                apellido, 
                telefono, 
                email, 
                mensaje
            }
        )

        res.status(200).json(data)
    } catch (error) {
        console.error("Error en contacto.controller - createContact", error)
        res.status(500).json({estado: "error", mensaje: "Error al cargar el contacto en la DB"})
    }
}

module.exports = {createContact}