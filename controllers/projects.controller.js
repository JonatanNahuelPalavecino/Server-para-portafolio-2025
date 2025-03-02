const { verComentarios } = require("../models/comentario.model")
const { verMeGusta } = require("../models/like.model")
const {verProyectos, crearProyecto} = require("../models/projects.model")

const createProject = async (req, res) => {

    const {nombre, introduccion, descripcion, github_fe, github_be, link} = req.body
    const {filename} = req.file

    try {
        const projectId = await crearProyecto(nombre, introduccion, descripcion, github_fe, github_be, link, filename)
        res.status(201).json({
            estado: 'success',
            mensaje: 'Proyecto creado correctamente',
            projectId,
        });
        
    } catch (error) {
        console.error('Error en project.controller - createProject', error);
        res.status(500).json({
            estado: 'error',
            mensaje: 'Error al crear el proyecto',
        });
    }
}

const watchProjects = async (req, res) => {

    const {filters} = req.body
    try {
        const data = await verProyectos(filters)

        data.data = await Promise.all(
            data.data.map( async (project) => {
                const filters = {id_proyecto: project.id_project}
    
                const comentarios = await verComentarios(filters)
                const likes = await verMeGusta(filters)
    
                return {...project, comentarios: comentarios.data, likes: likes.data}
            })
        )
        res.status(200).json(data)
    } catch (error) {
        console.error("Error en projects.controller - watchProjects", error)
        res.status(500).json({estado: "error", mensaje: "Error al traer los proyectos desde la DB"})
    }
}

module.exports = {
    createProject,
    watchProjects
}