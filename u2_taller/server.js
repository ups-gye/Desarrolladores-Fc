const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const db = require('./db');
const routes = require('./network/routes');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permite solo este origen (tu frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Habilitar cookies para el origen
}));

// Conectar a la base de datos
db(config.DB_URL);

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta public
app.use('/', express.static('public'));

// Definir rutas
routes(app);

// Iniciar el servidor
app.listen(config.PORT, () => {
    console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);
});
