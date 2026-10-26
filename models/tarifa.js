// Ficha de una tarifa en MongoDB
// Importamos Mongoose
const mongoose = require('mongoose');
// Datos de tarifa 
const tarifaSchema = new mongoose.Schema({
 // Una sola tarifa obligatoria por tipo de vehiculo
 tipo: { type: String, required: true, unique: true, enum: { values: ['carro, moto, bicicleta'], message: 'Tipo de vehiculo no valido' }},
 // Valor por hora: obligatorio y mayor que 0
 valorHora: { type: Number, required: true, min: [1, 'La hora debe ser mayor a 0'] }
});
// Exportamos el modelo para usarlo en rutas
module.exports = mongoose.model('Tarifa', tarifaSchema);
