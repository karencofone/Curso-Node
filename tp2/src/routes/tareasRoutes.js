// tareasRoutes.js

const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.post('/crear', tareasController.crearTarea);

router.get('/obtener', tareasController.obtenerTodasLasTareas);

router.get('/obtener/:id', tareasController.obtenerTareaPorId);

router.put('/actualizar/:id', tareasController.actualizarTarea);

router.delete('/eliminar/:id', tareasController.eliminarTarea);

module.exports = router;
