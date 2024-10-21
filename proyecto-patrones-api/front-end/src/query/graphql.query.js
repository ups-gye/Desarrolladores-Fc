// graphqlQueries.js
import { gql } from '@apollo/client';
import client from '../utils/graphql.client';

// Consulta para obtener el listado de hoteles
export const GET_HOTELES = gql`
    query GetHoteles {
        hoteles {
            id
            nombre
            direccion
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
// Ejemplo de consulta
export const GET_RESERVAS = gql`
    query GetReservas {
        reservas {
            id
            nombre
            fecha
            habitacion
        }
    }
`;

export const getReservas = async () => {
    try {
        const { data } = await client.query({
            query: GET_RESERVAS,
        });
        return data.reservas;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        throw error;
    }
};

// Ejemplo de mutación
export const CREATE_RESERVA = gql`
    mutation CreateReserva($nombre: String!, $fecha: String!, $habitacion: Int!) {
        createReserva(nombre: $nombre, fecha: $fecha, habitacion: $habitacion) {
            id
            nombre
            fecha
            habitacion
        }
    }
`;

export const createReserva = async (reservaData) => {
    try {
        const { data } = await client.mutate({
            mutation: CREATE_RESERVA,
            variables: reservaData,
        });
        return data.createReserva;
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