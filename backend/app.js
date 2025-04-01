// Importar el módulo de Express
const express = require('express');
const cors = require('cors'); // Importar el módulo CORS para manejar solicitudes entre dominios

const app = express();
app.use(cors()); // Usar CORS para permitir solicitudes desde otros dominios

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body; // Desestructurar el cuerpo de la solicitud

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' }); // Respuesta de error si falta algún campo
    }

    console.log('Datos recibidos:', req.body); // Mostrar los datos recibidos en la consola
    res.status(200).json({ message: 'Formulario recibido con éxito' }); // Respuesta de éxito
});

const port = 3000; // Puerto en el que el servidor escuchará las solicitudes
// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`); // Mensaje de inicio del servidor
});