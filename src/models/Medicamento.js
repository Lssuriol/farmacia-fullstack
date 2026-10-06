const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoMedic = require('./TipoMedic');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  Presentacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CodTipoMed: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoMedic,
      key: 'CodTipoMed'
    }
  }
}, {
  tableName: 'Medicamento',
  timestamps: false
});

TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed', as: 'medicamentos' });
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed', as: 'tipoMedic' });

module.exports = Medicamento;