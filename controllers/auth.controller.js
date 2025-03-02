const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  buscarUsuario,
  crearUsuario,
  desactivarUsuario,
  activarUsuario,
  buscarUsuarioByFilter,
} = require("../models/auth.model");
const path = require("path");
const fs = require("fs");
const { sendEmail } = require("../email/email");

const signUp = async (req, res) => {
  const { user_name, nombre, apellido, email, password } = req.body;
  const { filename } = req.file;

  try {
    const usuarioExistente = await buscarUsuario(email);

    if (usuarioExistente) {
      fs.unlinkSync(path.join(__dirname, "../public/users", filename));
      return res.status(400).json({
        estado: "error",
        mensaje: "El usuario ya existe",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = await crearUsuario(
      user_name,
      nombre,
      apellido,
      email,
      hashedPassword,
      filename
    );
    const token = jwt.sign(
      { user: { user_name: user_name, userId, imagen: filename, nombre, email } },
      process.env.SECRET_KEY,
      { expiresIn: process.env.DURATION_TOKEN }
    );

    await sendEmail(
      [email], 
      `Gracias ${nombre}, te registraste en el portfolio! - Jonatan Palavecino | Desarrollador Fullstack`, 
      "registro", 
      {
        user_name,
        nombre,
        apellido,
        email,
      }
    )

    res.cookie("token", token, {
      httpOnly: true, // Hace que la cookie no sea accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "none", // Evita que la cookie se envíe en solicitudes de terceros
      maxAge: 36000000, // Expira junto con el token
    });

    res.status(201).json({
      estado: "success",
      mensaje: "Usuario registrado correctamente",
      userName: user_name,
      userId,
      imagen: filename,
    });
  } catch (error) {
    console.error("Error en auth.controller - signUp", error);
    res.status(500).json({
      estado: "error",
      mensaje: "Error al registrar el usuario",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await buscarUsuario(email);

    if (!user) {
      return res.status(404).json({
        estado: "error",
        auth: false,
        mensaje: "Usuario no encontrado",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        estado: "error",
        auth: false,
        mensaje: "Contraseña incorrecta",
      });
    }

    if (user.activo == false) {
      return res.status(401).json({
        estado: "error",
        auth: false,
        mensaje: "Usuario desactivado",
        userId: user.id_usuario,
        activo: false
      });
    }

    const token = jwt.sign(
      {
        user: {
          userId: user.id_usuario,
          user_name: user.user_name,
          imagen: user.imagen_usuario,
          nombre: user.nombre,
          email: user.email
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.DURATION_TOKEN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 36000000,
    });

    res.json({
      estado: "success",
      auth: true,
      mensaje: "Inicio de sesión correcto",
      userName: user.user_name,
      userId: user.id_usuario,
      imagen: user.imagen_usuario,
    });
  } catch (error) {
    console.error("Error en auth.controller - signIn", error);
    res.status(500).json({
      estado: "error",
      auth: false,
      mensaje: "Error al autenticar el usuario",
      token: null,
    });
  }
};

const desactivateUser = async (req, res) => {
  const { id_usuario } = req.body;

  try {
    const result = await desactivarUsuario(id_usuario);

    const filters = {id_usuario}
    const {data} = await buscarUsuarioByFilter(filters)
    

    if (result.estado === "error") {
      res
        .status(500)
        .json({ estado: "error", mensaje: "Error al desactivar el usuario" });
      return;
    }

    await sendEmail(
      [data.email], 
      `Gracias ${data.nombre}, tu usuario ha sido desactivado! - Jonatan Palavecino | Desarrollador Fullstack`, 
      "desactiveUser", 
      {
        nombre: data.nombre,
      }
    )

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error en auth.controller - desactivateUser", error);
    res
      .status(500)
      .json({ estado: "error", mensaje: "Error al desactivar el usuario" });
  }
};

const activateUser = async (req, res) => {
  const { id_usuario } = req.body;

  try {
    const result = await activarUsuario(id_usuario);

    const filters = {id_usuario}
    const {data} = await buscarUsuarioByFilter(filters)

    if (result.estado === "error") {
      res
        .status(500)
        .json({ estado: "error", mensaje: "Error al activar el usuario" });
      return;
    }

    await sendEmail(
      [data.email], 
      `Gracias ${data.nombre}, tu usuario ha sido reactivado! - Jonatan Palavecino | Desarrollador Fullstack`, 
      "activeUser", 
      {
        nombre: data.nombre,
      }
    )

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error en auth.controller - activateUser", error);
    res
      .status(500)
      .json({ estado: "error", mensaje: "Error al activar el usuario" });
  }
};

const findUser = async (req, res) => {
  const { filters } = req.body;

  try {
    const data = await buscarUsuarioByFilter(filters);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en auth.controller - findUser", error);
    res
      .status(500)
      .json({ estado: "error", mensaje: "Error al buscar el usuario" });
  }
};

const signOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.json({ estado: "success", mensaje: "Sesión cerrada correctamente" });
};

module.exports = { signUp, signIn, desactivateUser, activateUser, findUser, signOut };
