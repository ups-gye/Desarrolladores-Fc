const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usuario_service } = require('../../services');

const SECRET_KEY = process.env.SECRET_KEY || 'mi_secreto';

// Registro de usuario (admin o cliente)
async function registrarUsuario(req, res) {
    console.log('Registro de usuario', req.body);
    const { nombre, email, password, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = usuario_service.crearUsuario({
            nombre: nombre,
            email: email,
            password: hashedPassword,
            rol: rol,
        });
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error en el registro', error: error.message });
    }
}

// Login de usuario
async function loginUsuario(req, res) {
    console.log('Login de usuario', req.body);
    const { email, password } = req.body;

    try {
        const usuario = await usuario_service.obtenerUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol, email: usuario.email, nombre: usuario.nombre },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        // Enviar el token en una cookie HTTP-only
        res.cookie('token', token, {
            httpOnly: true, // Solo accesible por el servidor
            secure: true,
            //secure: process.env.NODE_ENV === 'production', // En producción, solo HTTPS
            maxAge: 3600000, // 1 hora
        });
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el login', error: error.message });
    }
}
// logout de usuario
async function logoutUsuario(req, res) {
    try {
        es.clearCookie('token'); // Eliminar cookie del token
        res.json({ mensaje: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el login', error: error.message });
    }
}

// Verificación de token (middleware)
function verificarToken(req, res, next) {
    const token = req.cookies.token; // Leer token de las cookies
    //const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded; // Agregamos el usuario a la request
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
}

module.exports = { registrarUsuario, loginUsuario, logoutUsuario, verificarToken };
