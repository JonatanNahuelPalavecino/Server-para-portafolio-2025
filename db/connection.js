const mysql = require('mysql2/promise');

const poolConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
  waitForConnections: true, // Espera si todas las conexiones están ocupadas
  connectionLimit: 20, // Número máximo de conexiones en el pool
  queueLimit: 0, // Límite de solicitudes en cola (0 = ilimitado)
};

let pool;

const connectDB = async () => {
  if (!pool) {
    pool = mysql.createPool(poolConfig); // Crea el pool solo una vez
    console.log('Pool de conexiones a la base de datos creado.');
  }
  return pool; // Devuelve el pool en lugar de una conexión única
};

module.exports = connectDB;
