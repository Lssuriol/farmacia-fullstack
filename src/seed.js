const sequelize = require('./config/database');
const TipoMedic = require('./models/TipoMedic');
const Medicamento = require('./models/Medicamento');
const Usuario = require('./models/Usuario');
const bcrypt = require('bcryptjs');

const poblarBaseDatos = async () => {
  try {
    await sequelize.sync({ force: true });

    const analg = await TipoMedic.create({ descripcion: 'Analgésicos y Antiinflamatorios' });
    const antib = await TipoMedic.create({ descripcion: 'Antibióticos de Amplio Espectro' });

    await Medicamento.bulkCreate([
      {
        descripcionMed: 'Paracetamol 500mg',
        fechaFabricacion: '2025-01-10',
        fechaVencimiento: '2027-01-10',
        Presentacion: 'Caja x 100 tabletas',
        stock: 120,
        precioVentaUni: 0.50,
        precioVentaPres: 25.00,
        Marca: 'Bayer',
        CodTipoMed: analg.CodTipoMed
      },
      {
        descripcionMed: 'Amoxicilina 500mg',
        fechaFabricacion: '2025-03-01',
        fechaVencimiento: '2026-12-01',
        Presentacion: 'Frasco 100ml',
        stock: 45,
        precioVentaUni: 1.50,
        precioVentaPres: 18.00,
        Marca: 'Genfar',
        CodTipoMed: antib.CodTipoMed
      }
    ]);

    const passHash = await bcrypt.hash('123456', 10);
    await Usuario.bulkCreate([
      { nombre: 'Admin Farmacia', email: 'admin.farmacia@gmail.com', password: passHash, rol: 'administrador' },
      { nombre: 'Moderador Farmacia', email: 'mod.farmacia@gmail.com', password: passHash, rol: 'moderador' },
      { nombre: 'Usuario Cliente', email: 'user.farmacia@gmail.com', password: passHash, rol: 'usuario' }
    ]);

    console.log('Base de datos sincroinizada con las tablas exactas del laboratorio.');
    process.exit();
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
};

poblarBaseDatos();