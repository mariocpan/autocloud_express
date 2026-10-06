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
    const vehiculo = await Vehiculo.create({ placa: req.body.placa, tipo: req.body.tipo});
   // Vehiculo  creado de forma corecta 201 
   res.status(201).json(vehiculo);
    } catch (error) {
    // Placa repetida
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'La placa ya esta registrada' });
    }
    // Primer error de validacion de la ficha
    res.status(400).json({ mensaje: Object.values(error.errors)[0].message });
  }
});
// Muestra todos los vehiculos guardados
router.get('/', async (req, res) => {
  // Busca todas las fichas en MongoDB    
  const vehiculos = await Vehiculo.find();
  res.json(vehiculos);
  });
// busqueda por placa
router.get('/buscar', async (req, res) => {
  const placa = (req.query.placa || '').trim();
  // La placa solo puede tener letras y numeros
  if (!/^[A-Za-z0-9]+$/.test(placa)) {
    return res.status(400).json({ mensaje: 'la placa solo puede tener letras y numeros'});
  }
 // Busca las fichas que contengan ese texto, sin importar mayusculas 
const vehiculos = await Vehiculo.find({ placa:new RegExp(placa, 'i') });
if(vehiculos.length === 0) {
  return res.status(404).json({mensaje: 'No se encontraron coincidencias'});
}
res.json(vehiculos);
});
// Exportamos las rutas para usarlas en app.js

module.exports = router;
