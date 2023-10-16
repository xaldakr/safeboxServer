const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");

//configurando cors para permitir comunicación entre el backend y el frontend
const CorsConfig = {
  origin: "http://localhost:3000", //ubicación del frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //todos los metodos que podras realizar (aca estan todos)
  credentials: true, // Habilita el envío de cookies y encabezados de autenticación
  optionsSuccessStatus: 204, // Devuelve un 204 en respuestas OPTIONS
};

app.use(cors(CorsConfig));

//conectando servidor en el puerto 3000
try {
  app.listen(3001, () => {
    console.log("Server conectado en el puerto 3001");
  });
} catch (err) {
  console.log("Ocurrio el siguiente error" + err);
}

//objeto para conectar a popstgresql

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Safebox",
  password: "admin",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("Error de conexión:", err));

//probando

client.query("SELECT * FROM usuario", (err, result) => {
  if (!err) {
    console.log(result.rows);
  } else {
    console.error("Error en la consulta:", err);
  }

  // Cerrar la conexión
  client.end();
});
