const multer = require('multer');
const path = require('path');

// Configurar almacenamiento de las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { ubicacion } = req.body;
        cb(null, path.join(__dirname, `../public/${ubicacion}`)); // Aquí se guardan las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

// Tipos de archivo permitidos
const allowedFileTypes = /jpeg|jpg|png|gif/;

// Validación de archivos
const fileFilter = (req, file, cb) => {
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Archivo válido
    } else {
        cb(new Error('Solo se permiten archivos de tipo: .jpg, .jpeg, .png, .gif'));
    }
};

// Configurar multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB en bytes
    fileFilter: fileFilter
});

// Middleware personalizado para manejar errores de multer
const uploadMiddleware = (req, res, next) => {
    upload.single('imagen')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Errores específicos de multer (por ejemplo, límite de tamaño)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ estado: 'error', mensaje: 'El tamaño del archivo no debe superar 15 MB' });
            }
            return res.status(400).json({ estado: 'error', mensaje: err.message });
        } else if (err) {
            // Otros errores (e.g., tipo de archivo no permitido)
            return res.status(400).json({ estado: 'error', mensaje: err.message});
        }
        next();
    });
};

module.exports = uploadMiddleware;
