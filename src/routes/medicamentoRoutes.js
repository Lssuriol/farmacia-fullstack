const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicamentoController');

router.get('/', controller.obtenerMedicamentos);
router.post('/', controller.crearMedicamento);
router.put('/:id', controller.actualizarMedicamento);
router.delete('/:id', controller.eliminarMedicamento);

module.exports = router;