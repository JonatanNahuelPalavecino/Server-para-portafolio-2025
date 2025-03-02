const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  
  const token = req.cookies.token;

  if (!token) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    
    return res.status(403).send({
      estado: "error",
      auth: false,
      mensaje: "No existe token o falta autorización",
    });
  }

  // Verifica el token
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });
      
      return res.status(401).send({
        estado: "error",
        auth: false,
        mensaje: "Sesión cerrada. Token vencido o inválido",
      });
    }

    req.user = decoded.user;

    next();
  });
};
