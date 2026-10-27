// Ficha de un vehiculo en MongoDB
// Importamos Mongoose 
const mongoose = require('mongoose');
// Datos  de cada ficha y sus reglas
const vehiculoSchema = new mongoose.Schema({
  // Placa:  obligatoria y que no se puede repetir    
  placa: {type: String, required: true, unique: true, trim: true, uppercase: true, match: [/^[A-Z0-9]{6}$/,'La placa debe tener 6 caracteres alfanumericos']},
  // tipo de vehiculo:  obligatorio   
  tipo:  {type: String, required: [true,'El tipo de vehiculo es obligatorio'], enum: {values: ['Carro', 'Moto', 'Bicicleta'], message:'Tipo de vehiculo no valido'}},
  fechaIngreso:{type: Date, default: Date.now}
});
// Exportamos el modelo para usarlo en las rutas
module.exports = mongoose.model('Vehiculo', vehiculoSchema);