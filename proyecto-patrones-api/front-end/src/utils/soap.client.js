// soapClient.js
import soap from 'soap';

const url = process.env.REACT_APP_API_SOAP_URL || 'http://localhost:5000/reservas?wsdl';

const client = async () => {
    try {
        const client = await soap.createClientAsync(url);
        return client;
    } catch (error) {
        console.error('Error al crear el cliente SOAP:', error);
        throw error;
    }
};

export default client;