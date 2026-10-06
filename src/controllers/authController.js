const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || 'usuario'
    });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_super_seguro_farmacia',
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error: error.message });
  }
};