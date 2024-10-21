// graphql.client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.REACT_APP_API_GRAPHQL_URL,
        cache: new InMemoryCache(),
        credentials: 'include', // Para enviar cookies, si es 
        headers: {
            'Content-Type': 'application/json',
        },

    }),
    cache: new InMemoryCache(),
});

export default client;