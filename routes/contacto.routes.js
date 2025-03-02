const express = require("express")
const router = express.Router()
const {createContact} = require("../controllers/contacto.controller")

router.post("/cargar-contacto", createContact)

module.exports = router