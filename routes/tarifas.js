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
// Exportamos las rutas para usarlas en app.js
module.exports = router;