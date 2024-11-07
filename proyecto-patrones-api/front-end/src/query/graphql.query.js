// graphqlQueries.js
import { gql } from '@apollo/client';
import client from '../utils/graphql.client';
// Consulta para obtener el listado de hoteles
export const GET_HOTELES = gql`
    query GetHoteles {
        hoteles {
            id
            nombre
            descripcion
            direccion
            pais
            ciudad
            telefono
            email
            estrellas
        }
    }
`;

export const getHoteles = async () => {
    try {
        const { data, errors } = await client.query({
            query: GET_HOTELES,
        });
        if (errors) {
            console.error('Errores en la respuesta:', errors);
            throw new Error('Errores en la respuesta');
        }
        return data.hoteles;
    } catch (error) {
        console.error('Error al obtener hoteles:', error);
        throw error;
    }
};

// Consulta para obtener un hotel por ID
export const GET_HOTEL_BY_ID = gql`
    query GetHotelById($id: Int!) {
        hotelById(id: $id) {
            id
            nombre
            descripcion
            direccion
            pais
            ciudad
            telefono
            email
            estrellas
        }
    }
`;

export const getHotelById = async (id) => {
    console.log('hotelId:', id);
    try {
        const { data, errors } = await client.query({
            query: GET_HOTEL_BY_ID,
            variables: { id },
        });
        if (errors) {
            console.error('Errores en la respuesta:', errors);
            throw new Error('Errores en la respuesta');
        }
        return data.hotelById;
    } catch (error) {
        console.error('Error al obtener hotel por ID:', error);
        throw error;
    }
};

// Ejemplo de consulta para obtener el listado de habitaciones
export const GET_HABITACIONES = gql`
    query GetHabitaciones($hotelId: Int!) {
    habitaciones(hotelId: $hotelId) {
        id
        numero
        tipo
        precio
        estado
    }
}
`;

export const getHabitaciones = async (hotelId) => {
    console.log('hotelId:', hotelId);
    try {
        const { data, errors } = await client.query({
            query: GET_HABITACIONES,
            variables: { hotelId },
        });
        if (errors) {
            console.error('Errores en la respuesta:', errors);
            throw new Error('Errores en la respuesta');
        }
        console.log('Data:', data);
        return data.habitaciones;
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        throw error;
    }
};
//crrar habitacion
export const CREATE_HABITACION = gql`
mutation CrearHabitacion($numero: String!, $tipo: String!, $precio: Float!, $estado: String!, $hotel_id: Int!) {
  crearHabitacion(numero: $numero, tipo: $tipo, precio: $precio, estado: $estado, hotel_id: $hotel_id) {
    id
    numero
    tipo
    precio
    estado
  }
}
`;

export const createHabitacion = async (habitacionData) => {
    try {
        const habitacion = {
            hotel_id: parseInt(habitacionData.hotel_id),
            numero: habitacionData.numero.toString(),
            tipo: habitacionData.tipo,
            precio: parseFloat(habitacionData.precio),
            estado: habitacionData.estado
        };
        console.log('Habitacion:', habitacion);
        const { data } = await client.mutate({
            mutation: CREATE_HABITACION,
            variables: habitacion,
        });
        return data.crearHabitacion;
    } catch (error) {
        console.error('Error al crear habitacion:', error);
        throw error;
    }
}

// Ejemplo de consulta
export const GET_RESERVAS = gql`
    query Reservas {
        reservas {
            id
            Habitacion {
            id
            numero
            tipo
            precio
            estado
            }
            Usuario {
            id
            nombre
            apellido
            email
            telefono
            password
            rol
            }
            fecha_entrada
            fecha_salida
            estado
        }
    }
`;

export const getReservas = async () => {
    try {
        const { data } = await client.query({
            query: GET_RESERVAS,
        });
        console.log('Data:', data);
        return data.reservas;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        throw error;
    }
};

export const GET_RESERVAS_BY_USER = gql`
query ReservasPorUsuario($usuarioId: Int!) {
  reservasPorUsuario(usuarioId: $usuarioId) {
    id
    fecha_entrada
    fecha_salida
    estado
    Usuario {
      id
      nombre
      apellido
      email
      telefono
      password
      rol
    }
    Habitacion {
      id
      numero
      tipo
      precio
      estado
    }
  }
}
`;

export const getReservasByUser = async (userId) => {
    try {
        const { data } = await client.query({
            query: GET_RESERVAS_BY_USER,
            variables: { usuarioId: userId },
        });
        console.log('Data:', data);
        return data.reservasPorUsuario;
    } catch (error) {
        console.error('Error al obtener reservas por usuario:', error);
        throw error;
    }
}

export const CREATE_RESERVA = gql`
        mutation CrearReserva($habitacionId: Int!, $usuarioId: Int!, $fechaEntrada: String!, $fechaSalida: String!) {
        crearReserva(habitacionId: $habitacionId, usuarioId: $usuarioId, fecha_entrada: $fechaEntrada, fecha_salida: $fechaSalida) {
            Habitacion {
            id
            numero
            tipo
            precio
            estado
            }
        }
        }
`;

export const createReserva = async (reservaData) => {
    try {
        const reserva = {
            habitacionId: parseInt(reservaData.habitacionId),
            usuarioId: reservaData.usuarioId,
            fechaEntrada: reservaData.fecha_entrada,
            fechaSalida: reservaData.fecha_salida
        };
        console.log('Reserva:', reserva);
        const { data } = await client.mutate({
            mutation: CREATE_RESERVA,
            variables: reserva,
        });
        return data.crearReserva;
    } catch (error) {
        console.error('Error al crear reserva:', error);
        throw error;
    }
};



// // exampleUsage.js
// import { getReservas, createReserva } from './graphqlQueries';

// const exampleUsage = async () => {
//     try {
//         const reservas = await getReservas();
//         console.log('Reservas:', reservas);

//         const nuevaReserva = {
//             nombre: 'John Doe',
//             fecha: '2023-10-01',
//             habitacion: 101
//         };
//         const resultado = await createReserva(nuevaReserva);
//         console.log('Nueva Reserva:', resultado);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// exampleUsage();