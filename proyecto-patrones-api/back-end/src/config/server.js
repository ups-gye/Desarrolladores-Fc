const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const soap = require('soap');
const fs = require('fs');
const corsOptions = require('./cors'); // Configuración CORS
const { connectToDatabase } = require('./database');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.graphqlPath = '/graphql';
        this.soapPath = '/reservas';
        this.init();
    }
    async init() {
        // Conectar a la base de datos
        await connectToDatabase();
    }

    configureMiddleware() {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    applyRoutes(restRoutes) {
        this.app.use('/auth', restRoutes);
    }

    async applyGraphQL(schema, resolvers) {
        const server = new ApolloServer({ typeDefs: schema, resolvers });
        await server.start();
        server.applyMiddleware({ app: this.app, path: this.graphqlPath, cors: corsOptions });
    }

    configureSOAP(service, wsdlPath) {
        const wsdl = fs.readFileSync(wsdlPath, 'utf8');
        soap.listen(this.app, this.soapPath, service, wsdl);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`SOAP running at http://localhost:${this.port}${this.soapPath}?wsdl`);
            console.log(`GraphQL running at http://localhost:${this.port}${this.graphqlPath}`);
        });
    }
}

module.exports = Server;
