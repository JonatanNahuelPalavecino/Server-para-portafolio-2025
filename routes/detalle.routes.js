const express = require("express")
const router = express.Router()
const controller = require("../controllers/detalle.controller")

router.get("/ver-detalles", controller.watchDetail)

router.post("/crear-detalle", controller.createDetail)

module.exports = router