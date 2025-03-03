const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser")

const app = express();

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS
app.use(
    cors({
        origin: ['https://www.jonatanpalavecino.com.ar', 'http://localhost:5173'],
        credentials: true
    })
);

// Rutas
const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

const comentariosRouter = require("./routes/comentario.routes")
app.use("/comentarios", comentariosRouter)

const projectsRouter = require("./routes/projects.routes")
app.use("/proyectos", projectsRouter)

const conocimientosRouter = require("./routes/conocimientos.routes")
app.use("/conocimientos", conocimientosRouter)

const detallesRouter = require("./routes/detalle.routes")
app.use("/detalles", detallesRouter)

const likeRouter = require("./routes/like.routes")
app.use("/like", likeRouter)

const contactRouter = require("./routes/contacto.routes")
app.use("/contacto", contactRouter)

const visitasRouter = require("./routes/visitas.routes")
app.use("/datos", visitasRouter)

module.exports = app;
