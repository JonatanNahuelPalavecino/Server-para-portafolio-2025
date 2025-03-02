const express = require("express")
const router = express.Router()
const controller = require("../controllers/visitas.controller")

router.post("/registrar-visita", controller.addVisit)

module.exports = router