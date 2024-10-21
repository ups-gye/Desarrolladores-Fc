const Server = require('./config/server');
const authRoutes = require('./rest/routes/auth.route'); // Rutas REST
const schema = require('./graphql/schema'); // Esquema GraphQL
const resolvers = require('./graphql/resolvers'); // Resolvers
const reservasService = require('./soap/reservasService'); // Servicio SOAP

const server = new Server();

const startServer = async () => {
    try {
        // Configurar middlewares y rutas
        server.configureMiddleware();
        server.applyRoutes(authRoutes);

        // Configurar servicios GraphQL y SOAP
        await server.applyGraphQL(schema, resolvers);
        server.configureSOAP(reservasService, './src/soap/reservas.wsdl');

        // Iniciar servidor
        server.start();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Salir del proceso si falla la conexión
    }
};


startServer();
