const { buildSchema } = require('graphql');
const schema = buildSchema(`
    type Hotel {
        id: ID!
        nombre: String!
        descripcion: String
        direccion: String!
        pais: String!
        ciudad: String!
        telefono: String
        email: String
        estrellas: Int
    }

    type Habitacion {
        id: ID!
        numero: String!
        tipo: String!
        precio: Float!
        estado: String!
        Hotel: Hotel
    }
    
    type Usuario {
        id: ID!
        nombre: String!
        apellido: String!
        email: String!
        telefono: String!
        password: String!
        rol: String!
    }

    type Reserva {
        id: ID!
        Habitacion: Habitacion
        Usuario: Usuario
        fecha_entrada: String!
        fecha_salida: String!
        estado: String!
    }

    type Query {
        hoteles: [Hotel]
        hotelById(id: Int!): Hotel
        habitaciones(hotelId: Int!): [Habitacion]
        reservas: [Reserva]
        usuarios: [Usuario]
        habitacionMasCara(hotelId: Int!): Habitacion
        habitacionMasBarata(hotelId: Int!): Habitacion
        hotelMasPopular: Hotel
        totalReservasPorHotel(hotelId: Int!): Int
        reservasPorUsuario(usuarioId: Int!): [Reserva]
        habitacionesDisponibles(hotelId: Int!): [Habitacion]
    }

    type Mutation {
        crearReserva(habitacionId: Int!, usuarioId: Int!, fecha_entrada: String!, fecha_salida: String!): Reserva
        actualizarReserva(id: Int!, habitacionId: Int, usuarioId: Int, fecha_entrada: String, fecha_salida: String, estado: String): Reserva
        eliminarReserva(id: Int!): Reserva
        crearHotel(nombre: String!, direccion: String!, estrellas: Int!): Hotel
        actualizarHotel(id: Int!, nombre: String, direccion: String, estrellas: Int): Hotel
        eliminarHotel(id: Int!): Hotel
        crearHabitacion(numero: String!, tipo: String!, precio: Float!, estado: String!, hotel_id: Int!): Habitacion
        actualizarHabitacion(id: Int!, numero: String, tipo: String, precio: Float, estado: String): Habitacion
        eliminarHabitacion(id: Int!): Habitacion
        crearUsuario(nombre: String!, apellido: String!, email: String!, telefono: String!, password: String!, rol: String!): Usuario
        actualizarUsuario(id: Int!, nombre: String!, apellido: String!, email: String, telefono: String!, passwords: String!, rol: String!): Usuario
        eliminarUsuario(id: Int!): Usuario        
    }
`);

module.exports = schema;
