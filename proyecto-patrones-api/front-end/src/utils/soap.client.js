import axios from 'axios';

const apiRest = axios.create({
    baseURL: process.env.REACT_APP_API_SOAP_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/xml',
    },
});

// Función para convertir nodos XML a JSON
const xmlNodeToJson = (node) => {
    const obj = {};
    if (node.nodeType === 1) { // Elemento
        if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const item = node.childNodes.item(i);
                if (item.nodeType === 1) { // Solo procesamos elementos
                    const nodeName = item.nodeName.replace("tns:", "");
                    if (obj[nodeName]) {
                        // Si el nombre del nodo ya existe, conviértelo en un array
                        if (!Array.isArray(obj[nodeName])) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(xmlNodeToJson(item));
                    } else {
                        obj[nodeName] = xmlNodeToJson(item);
                    }
                } else if (item.nodeType === 3 && item.nodeValue.trim()) { // Text node
                    return item.nodeValue.trim();
                }
            }
        }
    }
    return obj;
};

// Función principal para realizar la solicitud SOAP
export const soapClient = async (soapAction, soapBody) => {
    const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://www.example.com/reservas">
            <soapenv:Header/>
            <soapenv:Body>
              ${soapBody}
            </soapenv:Body>
        </soapenv:Envelope>
    `;

    try {
        const response = await apiRest.post('/reservas', soapEnvelope);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        // Obtener todos los nodos <tns:reservas>
        const reservasNodes = xmlDoc.getElementsByTagName("tns:reservas");

        // Convertir cada nodo de reservas en un objeto JSON y almacenarlos en un array
        const reservasArray = Array.from(reservasNodes).map(node => xmlNodeToJson(node));

        return reservasArray;
    } catch (error) {
        console.error('Error al enviar la solicitud SOAP:', error);
        throw error;
    }
};
