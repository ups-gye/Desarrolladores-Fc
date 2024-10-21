# Cómo ejecutar el proyecto

## Prerrequisitos

1. **PostgreSQL**: Asegúrate de tener PostgreSQL instalado y en funcionamiento.
2. **Node.js**: Asegúrate de tener Node.js instalado.

## Configuración de la base de datos

1. Crea una base de datos en PostgreSQL llamada `reservas` o un nombre similar.

   ```sql
   CREATE DATABASE reservas;
   ```

## Variables de entorno

1. Crea una copia del archivo `.env.example` y nómbralo `.env`.
2. Configura las variables para la conexión a la base de datos en el archivo `.env`. Entre variables de entorno, encontrarás `SECRET_KEY`, que se utiliza para la generación de tokens. Puedes dejarlo como está o cambiarlo. Si cambias este valor, asegúrate de que coincida con la variable de entorno en el proyecto front-end.

## Instalación de dependencias

1. Instala las dependencias del proyecto con el siguiente comando:

   ```sh
   npm install
   ```

## Ejecución del proyecto

1. Ejecuta el proyecto en modo desarrollo con el siguiente comando:

   ```sh
   npm run dev
   ```

   O en modo producción con el siguiente comando:

   ```sh
   npm start
   ```

   Al ejecutar el proyecto, se crearán las tablas en la base de datos si todo se configura correctamente.s

## Datos de ejemplo

Por fines prácticos, al iniciar el proyecto se crea un hotel con quince habitaciones y un usuario administrador por defecto. Las credenciales de ese usuario son:

```javascript
{
   "email": "admin@example.com",
   "password": "admin123"
}
```
