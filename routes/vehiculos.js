// Rutas de vehiculos para guardar y consultar fichas
// Importamos Express para crear el grupo de rutas
const express = require('express');
const router = express.Router();
// Importamos el modelo (la ficha del vehiculo)
const Vehiculo = require('../models/vehiculo');
const Tarifa  = require('../models/tarifa');
const calcularCobro = require('../utils/cobro');
// POST guarda un vehiculo nuevo
router.post('/', async (req, res) => {
  try {
    // Creamos la ficha con los datos placa y tipo de vehiculo   
    const vehiculo = await Vehiculo.create({ placa: req.body.placa, tipo: req.body.tipo });
    // Vehiculo  creado de forma corecta 201 
    res.status(201).json(vehiculo);
  } catch (error) {
    // Placa repetida
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'La placa ya esta registrada' });
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
    return res.status(400).json({ mensaje: 'La placa solo puede tener letras y numeros' });
  }
  // Busca las fichas que contengan ese texto, sin importar mayusculas 
  const vehiculos = await Vehiculo.find({ placa: new RegExp(placa, 'i') });
  if (vehiculos.length === 0) {
    return res.status(404).json({ mensaje: 'No se encontraron coincidencias' });
  }
  res.json(vehiculos);
});
//Cambia el tipo de vehiculo
router.put('/:placa', async (req, res) => {
  try {
    // Busca y cambia solo el tipo 
    const vehiculo = await Vehiculo.findOneAndUpdate(
      { placa: req.params.placa.toUpperCase() },
      { tipo: req.body.tipo },
      { returnDocument: 'after', runValidators: true }
    );
    // No hay ficha con esa placa
    if (!vehiculo) {
      return res.status(404).json({ mensaje: 'Vehiculo no encontrado' });
    }
    res.json(vehiculo);
  } catch (error) {
    // Tipo de error valido  o error de datos
    res.status(400).json({ mensaje: error.errors ? Object.values(error.errors)[0].message : error.message });
  }
});
//elimina un vehiculo 
router.delete('/:placa', async (req, res) => {
  // Busca  vehiculo  por placa y lo elimina  
  const vehiculo = await Vehiculo.findOneAndDelete({ placa: req.params.placa.toUpperCase() });
  //NO  hay ficha con esa placa
  if (!vehiculo) {
    return res.status(404).json({ mensaje: 'Vehiculo no encontrado' });
  }
  res.json({ mensaje: 'Vehiculo eliminado' });
});
// Get cuanto cobrar por vehiculos
router.get('/:placa/tarifa', async (req, res) => {
// Busca la ficha del vehiculo por placa
const vehiculo = await Vehiculo.findOne({ placa: req.params.placa.toUpperCase() });
// No hay ficha con esa placa
if (!vehiculo) {
return res.status(404).json({mensaje:'Vehiculo no encontrado'});
}
// Busca la tarifa que corresponde al tipo del vehiculo
  const tarifa= await Tarifa.findOne({ tipo: vehiculo.tipo });
    if(!tarifa) {
    return res.status(404).json({mensaje: 'No hay tarifa para este tipo de vehiculo'});
  }
// Calculamos las horas y el total con la funcion
  const {horas, total} = calcularCobro(vehiculo. fechaIngreso, tarifa. valorHora);
res.json({ placa: vehiculo.placa, tipo: vehiculo.tipo, fechaIngreso:vehiculo.fechaIngreso,horas,valorHora:tarifa.valorHora,total });
}); 
// Exportamos las rutas para usarlas en app.js
module.exports = router;
