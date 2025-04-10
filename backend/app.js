// Importar el módulo express
const express = require('express');
// Importar el módulo cors para habilitar CORS
const cors = require('cors');

require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const helmet = require('helmet'); // Importar helmet para mejorar la seguridad de la aplicación
app.use(helmet()); // Usar helmet como middleware para proteger la aplicación

// Crear una instancia de express
const app = express();
// Habilitar CORS para todas las rutas
app.use(cors());

const rateLimit = require('express-rate-limit'); // Importar express-rate-limit para limitar la tasa de solicitudes

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limitar cada IP a 100 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.'
});

app.use(limiter); // Usar el limitador como middleware para todas las rutas


// Definir el puerto en el que se ejecutará la aplicación
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

const morgan = require('morgan'); // Importar morgan para registrar las solicitudes HTTP
app.use(morgan('combined')); // Usar morgan como middleware para registrar las solicitudes HTTP

const csurf = require('csurf'); // Importar csurf para proteger contra ataques CSRF
const cookieParser = require('cookie-parser'); // Importar cookie-parser para analizar cookies
app.use(cookieParser()); // Usar cookie-parser como middleware para analizar cookies
const csrfProtection = csurf({ cookie: true }); // Configurar csurf para usar cookies

app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() }); // Enviar el token CSRF al cliente
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    console.log('Nueva presentación recibida:', req.body);
    res.status(200).json({ message: 'Formulario recibido con éxito' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});