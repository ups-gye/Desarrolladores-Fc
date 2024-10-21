const { buildSchema } = require('graphql');
const schema = buildSchema(`
    type Hotel {
        id: ID!
        nombre: String!
        direccion: String!
        estrellas: Int
    }

    type Habitacion {
        id: ID!
        numero: String!
        tipo: String!
        precio: Float!
        estado: String!
        hotel: Hotel
    }
    
    type Usuario {
        id: ID!
        nombre: String!
        email: String!
        rol: String
    }

    type Reserva {
        id: ID!
        habitacion: Habitacion
        usuario: Usuario
        fecha_entrada: String!
        fecha_salida: String!
        estado: String!
    }

    type Query {
        hoteles: [Hotel]
        habitaciones(hotelId: Int!): [Habitacion]
        reservas: [Reserva]
        usuarios: [Usuario]
    }

    type Mutation {
        crearReserva(habitacionId: Int!, usuarioId: Int!, fecha_entrada: String!, fecha_salida: String!): Reserva
        actualizarReserva(id: Int!, habitacionId: Int, usuarioId: Int, fecha_entrada: String, fecha_salida: String, estado: String): Reserva
        eliminarReserva(id: Int!): Reserva
        crearHotel(nombre: String!, direccion: String!, estrellas: Int!): Hotel
        actualizarHotel(id: Int!, nombre: String, direccion: String, estrellas: Int): Hotel
        eliminarHotel(id: Int!): Hotel
        crearHabitacion(numero: String!, tipo: String!, precio: Float!, estado: String!, hotelId: Int!): Habitacion
        actualizarHabitacion(id: Int!, numero: String, tipo: String, precio: Float, estado: String): Habitacion
        eliminarHabitacion(id: Int!): Habitacion
        crearUsuario(nombre: String!, email: String!, rol: String!): Usuario
        actualizarUsuario(id: Int!, nombre: String, email: String, rol: String): Usuario
        eliminarUsuario(id: Int!): Usuario        
    }
`);

module.exports = schema;
