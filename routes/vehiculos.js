// Rutas de vehiculos para guardar y consultar fichas
// Importamos Express para crear el grupo de rutas
const express = require('express'); 
const router = express.Router();
// Importamos el modelo (la ficha del vehiculo)
const Vehiculo = require('../models/vehiculo');
// POST guarda un vehiculo nuevo
router.post('/', async (req, res) => {
  try {
    // Creamos la ficha con los datos placa y tipo de vehiculo   
    const vehiculo = await Vehiculo.create(req.body);
   // Vehiculo  creado de forma corecta 201 
   res.status(201).json(vehiculo);
  } catch (error) {
    // La placa esta duplicada 400   
    res.status(400).json({ mensaje: error.message });
  }
});
// Muestra todos los vehiculos guardados
router.get('/', async (req, res) => {
  // Buscam todas las fichas en MongoDB    
  const vehiculos = await Vehiculo.find();
  res.json(vehiculos);
});
// Exportamos las rutas para usarlas en app.js
module.exports = router;