require('dotenv').config(); // Cargar variables de entorno desde un archivo .env
// Importar el módulo de Express
const express = require('express');
const helmet = require('helmet'); // Importar el módulo Helmet para mejorar la seguridad de las aplicaciones Express
const cors = require('cors'); // Importar el módulo CORS para manejar solicitudes entre dominios
const rateLmit = require('express-rate-limit'); // Importar el módulo express-rate-limit para limitar la tasa de solicitudes
const csurf = require('csurf'); // Importar el módulo csurf para proteger contra ataques CSRF
const cookieParser = require('cookie-parser'); // Importar el módulo cookie-parser para manejar cookies
const { body, validationResult } = require('express-validator'); // Importar el módulo express-validator para validar datos de entrada
const morgan = require('morgan'); // Importar el módulo morgan para registrar solicitudes HTTP

const app = express();
app.use(helmet()); // Usar Helmet para proteger la aplicación Express
app.use(cors()); // Usar CORS para permitir solicitudes desde otros dominios
app.use(morgan('combined')); // Usar morgan para registrar solicitudes HTTP en formato combinado
app.use(cookieParser()); // Middleware para parsear cookies

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON

const limiter = rateLmit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar a 100 solicitudes por IP en un intervalo de 15 minutos
    message: 'Demasiadas solicitudes, por favor intente más tarde.' // Mensaje de error si se supera el límite
});
app.use(limiter); // Usar el limitador de tasa en todas las solicitudes

const csrfProtection = csurf({ cookie: true }); // Configurar protección CSRF usando cookies

app.get('/csrf-token', csrfProtection, (req, res) => {
    // Ruta para obtener el token CSRF
    res.json({ csrfToken: req.csrfToken() }); 
});

app.post('/submit', csrfProtection [
    body('name')
    .trim()
    .noEmpty().withMessage('El nombre es obligatorio'),
    body('email')
    .isEmail().withMessage('El correo electrónico no es válido'),
    body('message')
    .trim()
    .notEmpty().withMessage('El mensaje es obligatorio')
],
async (req, res) => {'pl,'
    const errors = validationResult(req); // Validar los datos de entrada
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Respuesta de error si hay errores de validación
    }

    const { name, email, message } = req.body; // Desestructurar el cuerpo de la solicitud

    console.log('Datos recibidos:', { name, email, message }); // Registrar los datos recibidos en la consola
    res.status(200).json({ message: 'Formulario recibido con éxito' }); // Respuesta de éxito
});

app.use((err, req, res, next) => {
    console.error('Error inesperado:'err.stack); // Registrar el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' }); // Manejo de errores 500
});

const port = 3000; // Puerto en el que el servidor escuchará las solicitudes
// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`); // Mensaje de inicio del servidor
});