const express = require('express');
const { registrarUsuario, loginUsuario, logoutUsuario, verificarToken } = require('../controllers/auth.controller');

const router = express.Router();

// Rutas de autenticación
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/logout', logoutUsuario);

// Ejemplo: Ruta protegida (requiere autenticación)
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: 'Perfil del usuario', usuario: req.usuario });
});

module.exports = router;
