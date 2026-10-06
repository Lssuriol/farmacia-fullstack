const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');
const TipoMedic = require('./models/TipoMedic');
const Medicamento = require('./models/Medicamento');

const authRoutes = require('./routes/authRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/registro', (req, res) => res.render('registro'));

app.get('/menu', async (req, res) => {
  try {
    const tiposMedic = await TipoMedic.findAll({
      include: [{ model: Medicamento, as: 'medicamentos' }]
    });
    res.render('menu', { tiposMedic });
  } catch (error) {
    res.status(500).send('Error al cargar el menú principal');
  }
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a MySQL.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error BD:', err));