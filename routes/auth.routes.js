const express = require('express');
const router = express.Router();
const { signIn, signUp, desactivateUser, activateUser, findUser, signOut } = require('../controllers/auth.controller');
const uploadMiddleware = require('../middlewares/images.middleware');
const middleware = require("../middlewares/auth.middleware")

router.post('/sign-up', uploadMiddleware, signUp);

router.post('/sign-in', signIn);

router.post('/sign-out', signOut)

router.post('/buscar-usuario', findUser)

router.post('/desactivar-usuario', desactivateUser)

router.post('/activar-usuario', activateUser)

router.get("/protected", middleware, (req, res) => {

    const { userId, user_name, imagen, nombre, email } = req.user

    res.json({
        estado: "success",
        auth: true,
        userId, 
        user_name, 
        imagen,
        nombre,
        email
    })
})

module.exports = router;