// Modulo de registro de vehiculos - AutoCloud Parking 
//Importamos las herramientas necesarias
const express = require('express');
const mongoose = require('mongoose');
//Creamos la aplicacion
const app = express();
const PUERTO = 3000;
//Permite que el servidor encienda datos en formato JSON
app.use(express.json());
// Todas las rutas de vehiculos empiezan con /vehiculos
app.use('/vehiculos', require('./routes/vehiculos'))
//Ruta de prueba para saber que el servidor esta activo
app.get('/', (req, res) => {
  res.send('AutoCloud  Parking funcionando');
});
//// Conexion a la base de datos autocloudparking
mongoose.connect('mongodb://127.0.0.1:27017/autocloudparking')
  .then(() => console.log ('Conectado a MongoDB'))
  .catch((error) => console.log('Error de conexion:', error.message));
app.listen(PUERTO, () => {
  console.log('Servidor en http://localhost:3000');
});

