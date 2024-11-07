import { soapClient } from '../utils/soap.client';

export const getReservas = async () => {
    try {
        const soapAction = 'ObtenerReservas';
        const soapBody = `
            <res:ObtenerReservas/>
        `;

        // Llama al cliente SOAP y obtiene el resultado en JSON
        const resultJson = await soapClient(soapAction, soapBody);
        return resultJson;
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
export const getHabitaciones = async () => {
    try {
        const client = await soapClient();
        const [result] = await client.getHabitacionesAsync({});
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const createHabitacion = async (habitacionData) => {
    try {
        const client = await soapClient();
        const [result] = await client.createHabitacionAsync(habitacionData);
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const updateHabitacion = async (habitacionData) => {
    try {
        const client = await soapClient();
        const [result] = await client.updateHabitacionAsync(habitacionData);
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const deleteHabitacion = async (habitacionId) => {
    try {
        const client = await soapClient();
        const [result] = await client.deleteHabitacionAsync({ id: habitacionId });
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const createHotel = async (hotelData) => {
    try {
        const client = await soapClient();
        const [result] = await client.createHotelAsync(hotelData);
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const updateHotel = async (hotelData) => {
    try {
        const client = await soapClient();
        const [result] = await client.updateHotelAsync(hotelData);
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};
export const deleteHotel = async (hotelId) => {
    try {
        const client = await soapClient();
        const [result] = await client.deleteHotelAsync({ id: hotelId });
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};
export const getHoteles = async () => {
    try {
        const client = await soapClient();
        const [result] = await client.getHotelesAsync({});
        console.log('Resultado:', result);
        return result;
    } catch (error) {
        console.error('Error al consumir la API SOAP:', error);
        throw error;
    }
};

export const getHotelById = async (hotelId) => {
    try {
        const client = await soapClient();
        const [result] = await client.getHotelByIdAsync({ id: hotelId });
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