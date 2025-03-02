const express = require("express")
const router = express.Router()
const controller = require("../controllers/conocimientos.controller")

router.get("/ver-conocimientos", controller.watchKnowledge)

router.post("/crear-conocimiento", controller.createKnowledge)

router.get("/ver-total-conocimientos", controller.watchFullKnowledge)

module.exports = router

//crear una ruta que traiga al frontend los conocimientos con el detalle (routes, controller, model)