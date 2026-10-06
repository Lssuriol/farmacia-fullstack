const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'productos',
  timestamps: true
});

Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = Producto;