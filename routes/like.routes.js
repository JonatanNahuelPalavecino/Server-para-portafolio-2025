const express = require("express")
const router = express.Router()
const controller = require("../controllers/like.controller")

router.post("/ver-likes", controller.watchLike)

router.post("/suscribir-like", controller.createLike)

router.delete("/desuscribir-like", controller.deleteLike)

module.exports = router