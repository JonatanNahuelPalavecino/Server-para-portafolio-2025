const express = require("express")
const router = express.Router()
const controller = require("../controllers/comentario.controller")

router.post("/ver-comentarios", controller.watchcomments)

router.post("/cargar-comentario", controller.createComment)

module.exports = router