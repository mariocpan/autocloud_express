// Rutas de tarifas: cuanto se cobra por hora a cada tipo de vehiculo
// Importamos Express para crear el grupo de rutas
const express = require('express');
const router = express.Router();
// Importamos el modelo (la ficha de la tarifa)
const Tarifa = require('../models/tarifa');
// GET muestra todas las tarifas guardadas
router.get('/', async (req, res) => {
const tarifas = await Tarifa.find();
res.json(tarifas);
});
// POST guarda una tarifa nueva
router.post('/', async (req, res) => {
try {
// Creamos la ficha con el tipo y el valor por hora    
const tarifa = await Tarifa.create({ tipo: req.body.tipo, valorHora:req.body.valorHora });
// Tarifa creada de forma correcta: 201
res.status(201).json(tarifa);
} catch (error) {
// Ya existe una tarifa para ese tipo: 409    
if (error.code === 11000) {
return res.status(409).json({ mensaje:'Ya existe una tarifa para ese tipo de vehiculo'});    
}
// Primer error de validacion de la ficha: 400
res.status(400).json({mensaje: Object.values(error.errors)[0].message });
}
});
// PUT cambia el valor por hora de una tarifa
router.put('/:tipo', async (req, res) => {
try {
 // Busca la ficha por tipo y cambia solo el valor por hora    
const tarifa = await Tarifa.findOneAndUpdate(
{ tipo: req.params.tipo },
{ valorHora: req.body.valorHora },
{ returnDocument: 'after', runValidators: true }
);
// No hay tarifa para ese tipo
if (!tarifa) {
return res.status(404).json({ mensaje:'Tarifa no encontrada'});
}
res.json(tarifa);
} catch (error) {
 // Valor no valido u otro error de datos
res.status(400).json({ mensaje: error.errors ? Object.values(error. errors)[0].message : error. message});
}
});
// Exportamos las rutas para usarlas en app.js
module.exports = router;