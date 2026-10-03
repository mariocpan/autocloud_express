// Ficha de un vehiculo en MongoDB
// Importamos Mongoose 
const mongoose = require('mongoose');
// Datos  de cada ficha y sus reglas
const vehiculoSchema = new mongoose.Schema({
  // Placa:  obligatoria y que no se puede repetir    
  placa: {type: String, required: true, unique: true },
  // tipo de vehiculo:  obligatorio   
  tipo:  {type: String, required: true}
});
// Exportamos el modelo para usarlo en las rutas
module.exports = mongoose.model('Vehiculo', vehiculoSchema);