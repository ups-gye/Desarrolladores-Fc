import soapClient from '../utils/soap.client';

export const getReservas = async () => {
    try {
        const client = await soapClient();
        const [result] = await client.getReservasAsync({});
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const createReserva = async (reservaData) => {
    try {
        const client = await soapClient();
        const [result] = await client.createReservaAsync(reservaData);
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};


// // exampleUsage.js
// import { getReservas, createReserva } from './soapQueries';

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