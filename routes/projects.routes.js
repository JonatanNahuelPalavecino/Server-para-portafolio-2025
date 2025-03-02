const express = require("express")
const router = express.Router()
const controller = require("../controllers/projects.controller")
const uploadMiddleware = require("../middlewares/images.middleware")

router.post("/ver-proyectos", controller.watchProjects)

router.post("/crear-proyecto", uploadMiddleware, controller.createProject)

module.exports = router
