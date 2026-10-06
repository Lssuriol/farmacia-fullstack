const Medicamento = require('../models/Medicamento');


exports.obtenerMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener medicamentos', error: error.message });
  }
};


exports.crearMedicamento = async (req, res) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear medicamento', error: error.message });
  }
};


exports.actualizarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicamento.update(req.body, { where: { CodMedicamento: id } });
    res.json({ mensaje: 'Medicamento actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
  }
};


exports.eliminarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicamento.destroy({ where: { CodMedicamento: id } });
    res.json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
  }
};