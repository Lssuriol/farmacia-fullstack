const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoMedic = sequelize.define('TipoMedic', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'TipoMedic',
  timestamps: false
});

module.exports = TipoMedic;