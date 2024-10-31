import axios from 'axios';


const apiRest = axios.create({
    baseURL: process.env.REACT_APP_API_SOAP_URL,
    withCredentials: true, // Habilitar el envío de cookiess
    headers: {
        'Content-Type': 'application/xml',
    },
});
const xmlNodeToJson = (node) => {
    const obj = {};
    if (node.nodeType === 1) { // Elemento
        if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const item = node.childNodes.item(i);
                if (item.nodeType === 1) { // Solo procesamos elementos
                    const nodeName = item.nodeName.replace("tns:", "");
                    obj[nodeName] = xmlNodeToJson(item);
                } else if (item.nodeType === 3 && item.nodeValue.trim()) { // Text node
                    return item.nodeValue.trim();
                }
            }
        }
    }
    return obj;
};

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
        // Analizar el XML y extraer <tns:ObtenerReservasResponse>
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        // Obtener el contenido de <tns:ObtenerReservasResponse>
        const responseNode = xmlDoc.getElementsByTagName("tns:reservas")[0];

        // Convertir XML a JSON
        const jsonResponse = xmlNodeToJson(responseNode);

        // Formatear el JSON como un arreglo de objetos
        const reservasArray = Array.isArray(jsonResponse.reservas)
            ? jsonResponse.reservas
            : [jsonResponse.reservas];

        return reservasArray;
    } catch (error) {
        console.error('Error al enviar la solicitud SOAP:', error);
        throw error;
    }
};
